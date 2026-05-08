Arduino.forBlock['tb6612_motor_init'] = function(block, generator) {
  generator.addLibrary('SparkFun_TB6612', '#include <SparkFun_TB6612.h>');
  
  // 电机A的引脚
  var ain1 = generator.valueToCode(block, 'AIN1', Arduino.ORDER_ATOMIC);
  var ain2 = generator.valueToCode(block, 'AIN2', Arduino.ORDER_ATOMIC);
  var pwmA = generator.valueToCode(block, 'PWMA', Arduino.ORDER_ATOMIC);
  var offsetA = generator.valueToCode(block, 'OFFSET_A', Arduino.ORDER_ATOMIC);
  
  // 电机B的引脚
  var bin1 = generator.valueToCode(block, 'BIN1', Arduino.ORDER_ATOMIC);
  var bin2 = generator.valueToCode(block, 'BIN2', Arduino.ORDER_ATOMIC);
  var pwmB = generator.valueToCode(block, 'PWMB', Arduino.ORDER_ATOMIC);
  var offsetB = generator.valueToCode(block, 'OFFSET_B', Arduino.ORDER_ATOMIC);
  
  // 待机引脚
  var stbyPin = generator.valueToCode(block, 'STBY_PIN', Arduino.ORDER_ATOMIC);

  // 获取电机名称
  const motorA_Name = Arduino.nameDB_.getName(
    block.getFieldValue('MOTOR_A_NAME') || 'motor1',
    "VARIABLE"
  );
  
  const motorB_Name = Arduino.nameDB_.getName(
    block.getFieldValue('MOTOR_B_NAME') || 'motor2',
    "VARIABLE"
  );
  
  // 添加两个电机变量
  generator.addVariable(motorA_Name, 'Motor ' + motorA_Name + '(' + ain1 + ', ' + ain2 + ', ' + pwmA + ', ' + offsetA + ', ' + stbyPin + ');');
  generator.addVariable(motorB_Name, 'Motor ' + motorB_Name + '(' + bin1 + ', ' + bin2 + ', ' + pwmB + ', ' + offsetB + ', ' + stbyPin + ');');
  
  // 添加初始化代码到setup函数
  var setupCode = `// 初始化TB6612双电机驱动器
Serial.println("TB6612双电机驱动器初始化完成");
Serial.println("电机A: " + String(${ain1}) + "," + String(${ain2}) + "," + String(${pwmA}));
Serial.println("电机B: " + String(${bin1}) + "," + String(${bin2}) + "," + String(${pwmB}));
Serial.println("待机引脚: " + String(${stbyPin}));`;

  generator.addSetup('tb6612_dual_init', setupCode);
  
  // 保存电机名称供其他函数使用
  generator.tb6612_motorA = motorA_Name;
  generator.tb6612_motorB = motorB_Name;
  
  return '';
};

function getTb6612MotorName(generator, motorSelect) {
  if (motorSelect === 'A') {
    return generator.tb6612_motorA || 'motor1';
  }

  return generator.tb6612_motorB || 'motor2';
}

function getTb6612SpeedCode(block, generator) {
  return generator.valueToCode(block, 'SPEED', Arduino.ORDER_ATOMIC) || '0';
}

// Drive - 电机前进
Arduino.forBlock['tb6612_drive'] = function(block, generator) {
  // 获取要控制的电机选择（A或B）
  var motorSelect = block.getFieldValue('MOTOR_SELECT') || 'A'; // 默认电机A
  var speed = getTb6612SpeedCode(block, generator);
  var motorName = getTb6612MotorName(generator, motorSelect);

  // 在生成的 C++ 中取绝对值，避免变量输入在 JS 侧被算成 NaN。
  return motorName + '.drive(abs(' + speed + '));\n';
};

// 单个电机后退
Arduino.forBlock['tb6612_reverse'] = function(block, generator) {
  // 获取要控制的电机选择（A或B）
  var motorSelect = block.getFieldValue('MOTOR_SELECT') || 'A'; // 默认电机A
  var speed = getTb6612SpeedCode(block, generator);
  var motorName = getTb6612MotorName(generator, motorSelect);

  // 统一生成负值，避免表达式输入出现 -a + b 这类优先级问题。
  return motorName + '.drive(-abs(' + speed + '));\n';
};

Arduino.forBlock['tb6612_brake'] = function(block, generator) {
  // 获取要控制的电机选择（A或B）
  var motorSelect = block.getFieldValue('MOTOR_SELECT') || 'A'; // 默认电机A
  var motorName = getTb6612MotorName(generator, motorSelect);
  
  return motorName + '.brake();\n';
};

Arduino.forBlock['tb6612_dual_action'] = function(block, generator) {
  var mode = block.getFieldValue('MODE'); // 'forward', 'back', 'left', 'right', 'brake'
  var speed = generator.valueToCode(block, 'SPEED', Arduino.ORDER_ATOMIC);
  
  var motor1 = generator.tb6612_motorA || 'motor1';
  var motor2 = generator.tb6612_motorB || 'motor2';
  
  switch (mode) {
    case 'forward':
      if (speed && speed !== '255') return 'forward(' + motor1 + ', ' + motor2 + ', ' + speed + ');\n';
      else return 'forward(' + motor1 + ', ' + motor2 + ');\n';
    case 'back':
      if (speed && speed !== '255') return 'back(' + motor1 + ', ' + motor2 + ', ' + speed + ');\n';
      else return 'back(' + motor1 + ', ' + motor2 + ');\n';
    case 'left':
      return 'left(' + motor1 + ', ' + motor2 + ', ' + speed + ');\n';
    case 'right':
      return 'right(' + motor1 + ', ' + motor2 + ', ' + speed + ');\n';
    case 'brake':
      return 'brake(' + motor1 + ', ' + motor2 + ');\n';
    default:
      return '';
  }
};
