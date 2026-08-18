# array

Core library, usually already integrated into the initial template

## Library Info
- **Name**: @aily-project/lib-core-lists
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `list_create_empty` | Statement | VAR(field_input), TYPE(dropdown), LENGTH(input_value) | `list_create_empty("myList", int, math_number(0))` | `int myList[1];` |
| `list_create_with_values` | Statement | VAR(field_input), TYPE(dropdown), VALUES(input_value) | `list_create_with_values("myList", int, math_number(0))` | `int myList[1] = 1;` |
| `list_values` | Value | INPUT0(input_value); variadic: INPUT{1...}(input_value) | `list_values(math_number(0), INPUT1=math_number(2))` | `{1}` |
| `list_values_simple` | Value | LIST(field_input) | `list_values_simple("1, 2, 3")` | `{1, 2, 3}` |
| `list_get` | Value | VAR(field_variable), INDEX(input_value) | `list_get($myList, math_number(0))` | `myList[1]` |
| `list_set` | Statement | VAR(field_variable), INDEX(input_value), VALUE(input_value) | `list_set($myList, math_number(0), math_number(0))` | `myList[1] = 1;` |
| `list_length` | Value | VAR(field_variable) | `list_length($myList)` | `(sizeof(myList) / sizeof(myList[0]))` |
| `list_find` | Value | VAR(field_variable), VALUE(input_value) | `list_find($myList, math_number(0))` | `_listFind_myList(1)` |
| `list_contains` | Value | VAR(field_variable), VALUE(input_value) | `list_contains($myList, math_number(0))` | `_listContains_myList(1)` |
| `list_min_max` | Value | VAR(field_variable), MODE(dropdown) | `list_min_max($myList, min)` | `_listMin_myList()` |
| `list_sort` | Statement | VAR(field_variable), ORDER(dropdown) | `list_sort($myList, asc)` | `_listSort_myList_asc();` |
| `list_reverse` | Statement | VAR(field_variable) | `list_reverse($myList)` | `_listReverse_myList();` |
| `list_fill` | Statement | VAR(field_variable), VALUE(input_value) | `list_fill($myList, math_number(0))` | `_listFill_myList(1);` |
| `list_copy` | Statement | FROM(field_variable), TO(field_variable) | `list_copy($myList, $copyList)` | `_listCopy_myList_to_copyList();` |
| `list_foreach` | Statement | VAR(field_variable), ITEM(field_input), DO(input_statement) | `list_foreach($myList, "item")` | `for (int _i = 0; _i < (sizeof(myList) / sizeof(myList[0])); _i++) { ↵ auto item = myList[_i]; ↵ }` |
| `list_foreach_index` | Statement | VAR(field_variable), INDEX(field_input), ITEM(field_input), DO(input_statement) | `list_foreach_index($myList, "i", "item")` | `for (int i = 0; i < (sizeof(myList) / sizeof(myList[0])); i++) { ↵ auto item = myList[i]; ↵ }` |
| `list2d_create` | Statement | VAR(field_input), TYPE(dropdown), ROWS(input_value), COLS(input_value) | `list2d_create("matrix", int, math_number(0), math_number(0))` | `int matrix[1][1];` |
| `list2d_create_with_values` | Statement | VAR(field_input), TYPE(dropdown), INPUT0(input_value); variadic: INPUT{1...}(input_value) | `list2d_create_with_values("matrix", int, math_number(0), INPUT1=list_values(math_number(3), INPUT1=math_number(4)))` | `int matrix[1][1] = {1};` |
| `list2d_get` | Value | VAR(field_variable), ROW(input_value), COL(input_value) | `list2d_get($matrix, math_number(0), math_number(0))` | `matrix[1][1]` |
| `list2d_set` | Statement | VAR(field_variable), ROW(input_value), COL(input_value), VALUE(input_value) | `list2d_set($matrix, math_number(0), math_number(0), math_number(0))` | `matrix[1][1] = 1;` |
| `list2d_size` | Value | VAR(field_variable), DIMENSION(dropdown) | `list2d_size($matrix, rows)` | `(sizeof(matrix) / sizeof(matrix[0]))` |
| `list_shift` | Statement | VAR(field_variable), DIRECTION(dropdown) | `list_shift($myList, left)` | `_listShift_myList_left();` |
| `list_from_string` | Statement | VAR(field_input), TEXT(input_value) | `list_from_string("text", text("value"))` | `char text[] = "value";` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | int, unsigned int, long, unsigned long, short, unsigned short, float, double, char, unsigned char, String, byte | list_create_empty, list2d_create_with_values |
| TYPE | int, float, char, String, byte, long, double | list_create_with_values |
| MODE | min, max, sum, avg | list_min_max |
| ORDER | asc, desc | list_sort |
| TYPE | int, float, char, byte, long, double | list2d_create |
| DIMENSION | rows, cols | list2d_size |
| DIRECTION | left, right | list_shift |

## ABS Examples

### Basic Usage
```
arduino_setup()
    list_create_empty("myList", int, math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, list_values(math_number(0), INPUT1=math_number(2)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `list_create_empty("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
