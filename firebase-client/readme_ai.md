# FirebaseClient

Current asynchronous Firebase client with Realtime Database blocks.

## Library Info
- **Name**: @aily-project/lib-firebase-client
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `firebase_client_init` | Statement | VAR(field_input), API_KEY(input_value), EMAIL(input_value), PASSWORD(input_value), URL(input_value) | `firebase_client_init("firebaseApp", text("value"), text("value"), text("value"), text("value"))` | `UserAuth firebaseApp_auth("value", "value", "value"); ↵ FirebaseApp firebaseApp; ↵ WiFiClientSecure firebaseApp_ssl; ↵ AsyncClientClass firebaseApp_client(firebaseApp_ssl); ↵ RealtimeDatabase firebaseApp_db; ↵ firebaseApp_ssl.setInsecure(); ↵ initializeApp(firebaseApp_client, firebaseApp, getAuth(firebaseApp_auth), 120000); ↵ firebaseApp.getApp<RealtimeDatabase>(firebaseApp_db); ↵ firebaseApp_db.url("value"); ↵ firebaseApp.loop();` |
| `firebase_client_ready` | Value | VAR(field_variable) | `firebase_client_ready($firebaseApp)` | `firebaseApp.ready()` |
| `firebase_client_set` | Statement | VAR(field_variable), TYPE(dropdown), PATH(input_value), VALUE(input_value) | `firebase_client_set($firebaseApp, String, text("value"), math_number(0))` | `firebaseApp_db.set<String>(firebaseApp_client, "value", (String)(1));` |
| `firebase_client_get` | Value | VAR(field_variable), TYPE(dropdown), PATH(input_value) | `firebase_client_get($firebaseApp, String, text("value"))` | `firebaseApp_db.get<String>(firebaseApp_client, "value")` |
| `firebase_client_push` | Statement | VAR(field_variable), TYPE(dropdown), PATH(input_value), VALUE(input_value) | `firebase_client_push($firebaseApp, String, text("value"), math_number(0))` | `firebaseApp_db.push<String>(firebaseApp_client, "value", (String)(1));` |
| `firebase_client_path_action` | Value | VAR(field_variable), ACTION(dropdown), PATH(input_value) | `firebase_client_path_action($firebaseApp, remove, text("value"))` | `firebaseApp_db.remove(firebaseApp_client, "value")` |
| `firebase_client_last_error` | Value | VAR(field_variable), DATA(dropdown) | `firebase_client_last_error($firebaseApp, code)` | `firebaseApp_client.lastError().code()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | String, int, double, bool | firebase_client_set, firebase_client_get, firebase_client_push |
| ACTION | remove, exists | firebase_client_path_action |
| DATA | code, message | firebase_client_last_error |

## ABS Examples

### Basic Usage
```
arduino_setup()
    firebase_client_init("firebaseApp", text("value"), text("value"), text("value"), text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, firebase_client_ready($firebaseApp))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `firebase_client_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
