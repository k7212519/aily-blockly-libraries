// _varMonitorAttached: object names are registered and renamed by fastStepperAttach.
function fastStepperEnsure(generator) { generator.addLibrary('fast_stepper_include', '#include <FastAccelStepper.h>'); }
function fastStepperName(block) { var field=block.getField('VAR'); return field ? field.getText() : (block.getFieldValue('VAR') || 'stepper'); }
function fastStepperAttach(block) {
  if (block._fastStepperAttached) return; block._fastStepperAttached=true; block._fastStepperLast=block.getFieldValue('VAR')||'stepper';
  if (typeof registerVariableToBlockly==='function') registerVariableToBlockly(block._fastStepperLast,'FastAccelStepper');
  var field=block.getField('VAR'); if (!field) return; var original=field.onFinishEditing_;
  field.onFinishEditing_=function(newName){ if(typeof original==='function') original.call(this,newName); if(newName&&newName!==block._fastStepperLast&&typeof renameVariableInBlockly==='function'){renameVariableInBlockly(block,block._fastStepperLast,newName,'FastAccelStepper');block._fastStepperLast=newName;} };
}
Arduino.forBlock['fast_stepper_init']=function(block,generator){
  fastStepperEnsure(generator); fastStepperAttach(block); var name=block.getFieldValue('VAR')||'stepper'; var step=block.getFieldValue('STEP')||'2'; var dir=block.getFieldValue('DIR')||'3'; var enable=block.getFieldValue('ENABLE')||'4';
  generator.addObject('fast_stepper_engine','FastAccelStepperEngine _ailyStepperEngine;'); generator.addObject('fast_stepper_'+name,'FastAccelStepper *'+name+' = nullptr;');
  generator.addSetupBegin('fast_stepper_engine_init','_ailyStepperEngine.init();');
  generator.addSetupBegin('fast_stepper_init_'+name,name+' = _ailyStepperEngine.stepperConnectToPin('+step+');\nif ('+name+') {\n  '+name+'->setDirectionPin('+dir+');\n  '+name+'->setEnablePin('+enable+');\n  '+name+'->setAutoEnable(true);\n}'); return '';
};
Arduino.forBlock['fast_stepper_set_profile']=function(block,generator){fastStepperEnsure(generator);var n=fastStepperName(block),s=generator.valueToCode(block,'SPEED',generator.ORDER_ATOMIC)||'1000',a=generator.valueToCode(block,'ACCEL',generator.ORDER_ATOMIC)||'500';return 'if ('+n+') { '+n+'->setSpeedInHz('+s+'); '+n+'->setAcceleration('+a+'); }\n';};
Arduino.forBlock['fast_stepper_move']=function(block,generator){fastStepperEnsure(generator);var n=fastStepperName(block),m=block.getFieldValue('MODE')||'move',s=generator.valueToCode(block,'STEPS',generator.ORDER_ATOMIC)||'0';return 'if ('+n+') '+n+'->'+m+'('+s+');\n';};
Arduino.forBlock['fast_stepper_run']=function(block,generator){fastStepperEnsure(generator);var n=fastStepperName(block),a=block.getFieldValue('ACTION')||'runForward';if(a==='forceStop')return 'if ('+n+') '+n+'->forceStopAndNewPosition(0);\n';return 'if ('+n+') '+n+'->'+a+'();\n';};
Arduino.forBlock['fast_stepper_position']=function(block,generator){fastStepperEnsure(generator);var n=fastStepperName(block),p=generator.valueToCode(block,'POSITION',generator.ORDER_ATOMIC)||'0';return 'if ('+n+') '+n+'->setCurrentPosition('+p+');\n';};
Arduino.forBlock['fast_stepper_state']=function(block,generator){fastStepperEnsure(generator);var n=fastStepperName(block),s=block.getFieldValue('STATE')||'getCurrentPosition';var e=s==='targetPos'?n+'->targetPos()':n+'->'+s+'()';return ['('+n+' ? '+e+' : 0)',generator.ORDER_CONDITIONAL];};
