# Emakefun游戏手柄

Emakefun游戏手柄库，支持按键、摇杆、陀螺仪及2.4G/BLE无线通信。

## 库信息
- **名称**: @aily-project/lib-emakefun_gamepad
- **版本**: 1.0.0

## 块定义

| 块类型 | 连接类型 | 参数 (args0顺序) | ABS格式 | 生成代码 |
|--------|----------|------------------|---------|----------|
| `emakefun_gamepad_initialize` | Statement | VAR(field_input), ENABLE_GYRO(dropdown) | `emakefun_gamepad_initialize("gamepad", true)` | `emakefun::Gamepad gamepad; gamepad.Initialize(); gamepad.EnableGyroscope(true);` + loop自动添加`gamepad.Tick();` |
| `emakefun_gamepad_model_create` | Statement | VAR(field_input) | `emakefun_gamepad_model_create("gamepadModel")` | `emakefun::GamepadModel gamepadModel;` |
| `emakefun_gamepad_attach_model` | Statement | GAMEPAD(field_variable), MODEL(field_variable) | `emakefun_gamepad_attach_model($gamepad, $gamepadModel)` | `gamepad.AttachModel(&gamepadModel);` |
| `emakefun_gamepad_model_add_observer` | Statement | MODEL(field_variable), OBSERVER(field_variable) | `emakefun_gamepad_model_add_observer($gamepadModel, $publisher)` | `gamepadModel.AddObserver(&publisher);` |
| `emakefun_gamepad_button_pressed` | Statement | MODEL(field_variable), BUTTON(dropdown), HANDLER(input_statement) | 见下方 | loop中添加`if (model.ButtonPressed(btn)) { handler; }` |
| `emakefun_gamepad_button_released` | Statement | MODEL(field_variable), BUTTON(dropdown), HANDLER(input_statement) | 见下方 | loop中添加`if (model.ButtonReleased(btn)) { handler; }` |
| `emakefun_gamepad_get_button_state` | Value(Boolean) | MODEL(field_variable), BUTTON(dropdown) | `emakefun_gamepad_get_button_state($gamepadModel, 5)` | `gamepadModel.GetButtonState(emakefun::GamepadModel::kButtonA)` |
| `emakefun_gamepad_get_joystick_x` | Value(Number) | MODEL(field_variable) | `emakefun_gamepad_get_joystick_x($gamepadModel)` | `gamepadModel.GetJoystickCoordinate().x` |
| `emakefun_gamepad_get_joystick_y` | Value(Number) | MODEL(field_variable) | `emakefun_gamepad_get_joystick_y($gamepadModel)` | `gamepadModel.GetJoystickCoordinate().y` |
| `emakefun_gamepad_get_gravity_x` | Value(Number) | MODEL(field_variable) | `emakefun_gamepad_get_gravity_x($gamepadModel)` | `gamepadModel.GetGravityAcceleration().x` |
| `emakefun_gamepad_get_gravity_y` | Value(Number) | MODEL(field_variable) | `emakefun_gamepad_get_gravity_y($gamepadModel)` | `gamepadModel.GetGravityAcceleration().y` |
| `emakefun_gamepad_get_gravity_z` | Value(Number) | MODEL(field_variable) | `emakefun_gamepad_get_gravity_z($gamepadModel)` | `gamepadModel.GetGravityAcceleration().z` |
| `emakefun_gamepad_new_joystick_coordinate` | Value(Boolean) | MODEL(field_variable) | `emakefun_gamepad_new_joystick_coordinate($gamepadModel)` | `gamepadModel.NewJoystickCoordinate()` |
| `emakefun_gamepad_new_gravity_acceleration` | Value(Boolean) | MODEL(field_variable) | `emakefun_gamepad_new_gravity_acceleration($gamepadModel)` | `gamepadModel.NewGravityAcceleration()` |
| `emakefun_gamepad_publisher_rf24_create` | Statement | VAR(field_input), CE_PIN(input_value), CS_PIN(input_value), CHANNEL(input_value), ADDR_WIDTH(input_value), ADDRESS(input_value) | `emakefun_gamepad_publisher_rf24_create("publisher", math_number(7), math_number(8), math_number(115), math_number(5), math_number(73014444097))` | `emakefun::GamepadPublisherRf24 publisher(7, 8); publisher.Initialize(115, 5, 0x0011000011LL);` |
| `emakefun_gamepad_subscriber_rf24_create` | Statement | VAR(field_input), CE_PIN(input_value), CS_PIN(input_value), CHANNEL(input_value), ADDR_WIDTH(input_value), ADDRESS(input_value) | `emakefun_gamepad_subscriber_rf24_create("subscriber", math_number(7), math_number(8), math_number(115), math_number(5), math_number(73014444097))` | `emakefun::GamepadSubscriberRf24 subscriber(7, 8); subscriber.Initialize(115, 5, 0x0011000011LL);` + loop自动添加`subscriber.Tick();` |
| `emakefun_gamepad_subscriber_rf24_attach_model` | Statement | SUBSCRIBER(field_variable), MODEL(field_variable) | `emakefun_gamepad_subscriber_rf24_attach_model($subscriber, $gamepadModel)` | `subscriber.AttachModel(&gamepadModel);` |
| `emakefun_gamepad_publisher_ble_create` | Statement | VAR(field_input), SERIAL(dropdown) | `emakefun_gamepad_publisher_ble_create("publisher", Serial)` | `emakefun::GamepadPublisherBle publisher; publisher.Initialize(Serial);` |
| `emakefun_gamepad_subscriber_ble_create` | Statement | VAR(field_input), SERIAL(dropdown) | `emakefun_gamepad_subscriber_ble_create("subscriber", Serial)` | `emakefun::GamepadSubscriberBle subscriber; subscriber.Initialize(Serial);` + loop自动添加`subscriber.Tick();` |
| `emakefun_gamepad_subscriber_ble_attach_model` | Statement | SUBSCRIBER(field_variable), MODEL(field_variable) | `emakefun_gamepad_subscriber_ble_attach_model($subscriber, $gamepadModel)` | `subscriber.AttachModel(&gamepadModel);` |

**按键事件块ABS格式**：
```
emakefun_gamepad_button_pressed($gamepadModel, 5)
    @HANDLER:
        serial_println(Serial, text("A button pressed"))

emakefun_gamepad_button_released($gamepadModel, 5)
    @HANDLER:
        serial_println(Serial, text("A button released"))
```

## 参数选项

| 参数 | 值 | 描述 |
|------|-----|------|
| ENABLE_GYRO | true, false | 是否启用陀螺仪 |
| BUTTON | 0=摇杆按键, 1=L键, 2=R键, 3=Select键, 4=Mode键, 5=A键, 6=B键, 7=C键, 8=D键 | 按键类型 |
| SERIAL | Serial, Serial1, etc. | 串口选择（来自开发板配置） |

## ABS示例

### 手柄端基本使用（直接读取）
```
arduino_setup()
    emakefun_gamepad_initialize("gamepad", true)
    emakefun_gamepad_model_create("gamepadModel")
    emakefun_gamepad_attach_model($gamepad, $gamepadModel)

emakefun_gamepad_button_pressed($gamepadModel, 5)
    @HANDLER:
        serial_println(Serial, text("A button pressed"))

emakefun_gamepad_button_released($gamepadModel, 5)
    @HANDLER:
        serial_println(Serial, text("A button released"))
```

### 2.4G无线发送端（手柄）
```
arduino_setup()
    emakefun_gamepad_initialize("gamepad", false)
    emakefun_gamepad_model_create("gamepadModel")
    emakefun_gamepad_publisher_rf24_create("publisher", math_number(7), math_number(8), math_number(115), math_number(5), math_number(73014444097))
    emakefun_gamepad_attach_model($gamepad, $gamepadModel)
    emakefun_gamepad_model_add_observer($gamepadModel, $publisher)
```

### 2.4G无线接收端
```
arduino_setup()
    emakefun_gamepad_model_create("gamepadModel")
    emakefun_gamepad_subscriber_rf24_create("subscriber", math_number(7), math_number(8), math_number(115), math_number(5), math_number(73014444097))
    emakefun_gamepad_subscriber_rf24_attach_model($subscriber, $gamepadModel)

emakefun_gamepad_button_pressed($gamepadModel, 5)
    @HANDLER:
        serial_println(Serial, text("A button pressed"))
```

### BLE蓝牙发送端（手柄）
```
arduino_setup()
    emakefun_gamepad_initialize("gamepad", false)
    emakefun_gamepad_model_create("gamepadModel")
    emakefun_gamepad_publisher_ble_create("publisher", Serial)
    emakefun_gamepad_attach_model($gamepad, $gamepadModel)
    emakefun_gamepad_model_add_observer($gamepadModel, $publisher)
```

### BLE蓝牙接收端
```
arduino_setup()
    emakefun_gamepad_model_create("gamepadModel")
    emakefun_gamepad_subscriber_ble_create("subscriber", Serial)
    emakefun_gamepad_subscriber_ble_attach_model($subscriber, $gamepadModel)

emakefun_gamepad_button_pressed($gamepadModel, 5)
    @HANDLER:
        serial_println(Serial, text("A button pressed"))
```

## 注意事项

1. **自动变量声明**: 所有引用GamepadModel的块会自动声明`emakefun::GamepadModel`变量，无需单独放置"创建游戏手柄模型"块（但建议放置以保证代码清晰）
2. **自动loop代码**: `emakefun_gamepad_initialize`自动在loop中添加`gamepad.Tick()`；subscriber块自动添加`subscriber.Tick()`
3. **按键事件块**: `button_pressed`和`button_released`是Statement块，会在loop中生成`if`检查代码，HANDLER中的代码在条件满足时执行
4. **2.4G引脚**: UNO推荐CE=10, CS=9；Nano推荐CE=7, CS=8
5. **头文件**: 使用RF24时自动include `gamepad_publisher_rf24.h`/`gamepad_subscriber_rf24.h`；使用BLE时自动include `gamepad_publisher_ble.h`/`gamepad_subscriber_ble.h`
6. **参数顺序**: 遵循 `block.json` args0 定义的顺序
