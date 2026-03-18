# 自定义函数核心库

Arduino 自定义函数库，提供函数定义、调用、参数管理和返回值功能

## 库信息
- **库名**: @aily-project/lib-core-functions
- **版本**: 0.0.1

## 块定义

| 块类型 | 连接 | 参数 (args0 顺序) | ABS 格式 | 生成代码 |
|--------|------|-------------------|----------|----------|
| `custom_function_def` | Hat（顶层） | FUNC_NAME(field_input), RETURN_TYPE(dropdown), [TYPE(dropdown), NAME(field_input)]×N(mutator), STACK(input_statement), [RETURN(input_value)] | `custom_function_def("myFunc", int, int, "a", float, "b")` | `int myFunc(int a, float b) { ... }` |
| `custom_function_call` | 语句块 | FUNC_NAME(field_variable/FUNC), INPUT0..N(input_value) | `custom_function_call($myFunc, math_number(10))` | `myFunc(10);` |
| `custom_function_call_return` | 值块 | FUNC_NAME(field_variable/FUNC), INPUT0..N(input_value) | `custom_function_call_return($myFunc, math_number(10))` | `myFunc(10)` |
| `custom_function_return` | 语句块 | VALUE(input_value) | `custom_function_return(math_number(0))` | `return 0;` |
| `custom_function_return_void` | 语句块 | (无参数) | `custom_function_return_void()` | `return;` |

### Mutator（动态参数）

`custom_function_def` 通过 mutator 动态增删参数（点击 `+` 添加，`-` 删除）。每个参数有类型下拉和名称文本框。ABS 中在 RETURN_TYPE 之后依次写 `TYPE, "paramName"` 对：

```
custom_function_def("funcName", RETURN_TYPE, TYPE, "param1", TYPE, "param2")
    函数体语句
    @RETURN: returnValue    // 仅当 RETURN_TYPE 非 void 时使用
```

`custom_function_call` / `custom_function_call_return` 自动从 registry 同步参数数量与标签，FUNC_NAME 为 FUNC 类型变量（用 `$funcName` 引用），ABS 中按位置传参：

```
custom_function_call($funcName, arg0, arg1)
custom_function_call_return($funcName, arg0, arg1)
```

## ABS 示例

### 无参数 void 函数
```
custom_function_def("sayHello", void)
    serial_println(Serial, text("Hello World!"))

arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    custom_function_call($sayHello)
    time_delay(math_number(2000))
```

### 带参数 void 函数
```
custom_function_def("setLED", void, int, "pin", int, "state")
    digital_write(variables_get($pin), variables_get($state))

arduino_setup()
    pin_mode(math_number(13), OUTPUT)

arduino_loop()
    custom_function_call($setLED, math_number(13), math_number(1))
    time_delay(math_number(1000))
    custom_function_call($setLED, math_number(13), math_number(0))
    time_delay(math_number(1000))
```

### 带返回值函数（@RETURN: 插槽）
```
custom_function_def("addNumbers", int, int, "a", int, "b")
    @RETURN: math_arithmetic(ADD, variables_get($a), variables_get($b))

arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, custom_function_call_return($addNumbers, math_number(3), math_number(5)))
    time_delay(math_number(1000))
```

### 提前返回（early return）
```
custom_function_def("checkSensor", bool, int, "pin")
    controls_if()
        @IF0: logic_compare(analog_read(variables_get($pin)), GT, math_number(512))
        @DO0:
            custom_function_return(logic_boolean(TRUE))
    @RETURN: logic_boolean(FALSE)

arduino_loop()
    controls_if()
        @IF0: custom_function_call_return($checkSensor, math_number(0))
        @DO0:
            serial_println(Serial, text("Sensor triggered"))
```

### void 函数提前退出
```
custom_function_def("processData", void, int, "value")
    controls_if()
        @IF0: logic_compare(variables_get($value), LT, math_number(0))
        @DO0:
            custom_function_return_void()
    serial_println(Serial, variables_get($value))
```

## 参数选项

| 参数 | 可选值 | 说明 |
|------|--------|------|
| RETURN_TYPE | void, int8_t, int16_t, int32_t, int64_t, uint8_t, uint16_t, uint32_t, uint64_t, int, long, float, double, unsigned int, unsigned long, bool, char, byte, String, void*, size_t, unsigned char, int*, float*, char*, byte*, uint8_t*, const char*, int&, float&, String& | 函数返回类型 |
| PARAM TYPE | (同 RETURN_TYPE，不含 void) | 参数数据类型 |

## 注意事项

1. **顶层放置**: `custom_function_def` 必须放在工作区顶层（不能在 `arduino_setup` / `arduino_loop` 内），生成为独立的 C++ 函数
2. **参数变量引用**: 参数自动注册为工作区变量，函数体内使用 `variables_get($paramName)` 引用
3. **调用块类型**: 无需返回值用 `custom_function_call`（语句块），需要返回值用 `custom_function_call_return`（值块）
4. **返回值插槽**: RETURN_TYPE 非 void 时，函数定义块底部出现 `@RETURN:` 值输入槽；函数体内提前返回用 `custom_function_return(value)`；void 提前退出用 `custom_function_return_void()`
5. **函数名唯一**: 同一工作区内函数名不得重复，重复时自动追加数字后缀
6. **中文函数名**: 支持中文命名，代码生成时自动转为拼音标识符
7. **工具箱同步**: 定义/修改/删除函数后，工具箱"自定义函数"分类中的调用块自动同步
