# LibSSH ESP32

ESP32 SSH session, channel, and SCP blocks based on LibSSH-ESP32.

## Library Info
- **Name**: @aily-project/lib-libssh-esp32
- **Version**: 5.8.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `libssh_begin` | Statement | (none) | `libssh_begin()` | `ailyLibsshEnsureStarted();` |
| `libssh_connect_password` | Statement | VAR(field_input), HOST(input_value), USER(input_value), PASSWORD(input_value), PORT(input_value), TIMEOUT(input_value), LOG(dropdown) | `libssh_connect_password("sshSession", text("host"), text("user"), text("password"), math_number(22), math_number(10), 0)` | `sshSession = ailyLibsshConnectPassword("value", "value", "value", 1, 1, 0);` |
| `libssh_session_create` | Statement | VAR(field_input) | `libssh_session_create("sshSession")` | `ailyLibsshEnsureStarted(); ↵ sshSession = ssh_new();` |
| `libssh_session_set_options` | Statement | VAR(field_variable), HOST(input_value), USER(input_value), PORT(input_value), TIMEOUT(input_value), LOG(dropdown) | `libssh_session_set_options($sshSession, text("host"), text("user"), math_number(22), math_number(10), 0)` | `if (sshSession) { ↵ String sshHost_generator_coverage_libssh_session_set_options = "value"; ↵ String sshUser_generator_coverage_libssh_session_set_options = "value"; ↵ int sshPort_generator_coverage_libssh_session_set_options = 1; ↵ long sshTimeout_generator_coverage_libssh_session_set_options = 1; ↵ int sshLog_generator_coverage_libssh_session_set_options = 0; ↵ ssh_options_set(sshSession, SSH_OPTIONS_HOST, sshHost_generator_coverage_libssh_session_set_options.c_str()); ↵ if (sshUser_generator_coverage_libssh_session_set_options.length() > 0) ssh_options_set(sshSession, SSH_OPTIONS_USER, sshUser_generator_coverage_libssh_session_set_options.c_str()); ↵ ssh_options_set(sshSession, SSH_OPTIONS_PORT, &sshPort_generator_coverage_libssh_session_set_options); ↵ ssh_options_set(sshSession, SSH_OPTIONS_TIMEOUT, &sshTimeout_generator_coverage_libssh_session_set_options); ↵ ssh_options_set(sshSession, SSH_OPTIONS_LOG_VERBOSITY, &sshLog_generator_coverage_libssh_session_set_options); ↵ }` |
| `libssh_session_connect` | Value Boolean | VAR(field_variable) | `libssh_session_connect($sshSession)` | `(sshSession != NULL && ssh_connect(sshSession) == SSH_OK)` |
| `libssh_session_auth_password` | Value Boolean | VAR(field_variable), USER(input_value), PASSWORD(input_value) | `libssh_session_auth_password($sshSession, text("user"), text("password"))` | `ailyLibsshAuthPassword(sshSession, "value", "value")` |
| `libssh_session_connected` | Value Boolean | VAR(field_variable) | `libssh_session_connected($sshSession)` | `(sshSession != NULL && ssh_is_connected(sshSession))` |
| `libssh_session_error` | Value String | VAR(field_variable) | `libssh_session_error($sshSession)` | `String(sshSession ? ssh_get_error(sshSession) : "")` |
| `libssh_session_disconnect` | Statement | VAR(field_variable), FREE(field_checkbox), FINALIZE(field_checkbox) | `libssh_session_disconnect($sshSession, TRUE, FALSE)` | `if (sshSession) { ↵ ssh_disconnect(sshSession); ↵ ssh_free(sshSession); ↵ sshSession = NULL; ↵ }` |
| `libssh_channel_create` | Statement | VAR(field_input), SESSION(field_variable) | `libssh_channel_create("sshChannel", $sshSession)` | `sshChannel = sshSession ? ssh_channel_new(sshSession) : NULL;` |
| `libssh_channel_exec` | Value Boolean | VAR(field_variable), COMMAND(input_value) | `libssh_channel_exec($sshChannel, text("ls"))` | `ailyLibsshChannelExec(sshChannel, "value")` |
| `libssh_channel_read` | Value String | VAR(field_variable), MAX_BYTES(input_value), TIMEOUT(input_value), STREAM(dropdown) | `libssh_channel_read($sshChannel, math_number(512), math_number(1000), 0)` | `ailyLibsshChannelRead(sshChannel, 1, 1, false)` |
| `libssh_channel_write` | Statement | VAR(field_variable), DATA(input_value) | `libssh_channel_write($sshChannel, text("input"))` | `ailyLibsshChannelWrite(sshChannel, "value");` |
| `libssh_channel_close` | Statement | VAR(field_variable) | `libssh_channel_close($sshChannel)` | `if (sshChannel) { ↵ ssh_channel_send_eof(sshChannel); ↵ ssh_channel_close(sshChannel); ↵ ssh_channel_free(sshChannel); ↵ sshChannel = NULL; ↵ }` |
| `libssh_scp_open` | Statement | VAR(field_input), SESSION(field_variable), MODE(dropdown), LOCATION(input_value) | `libssh_scp_open("sshScp", $sshSession, SSH_SCP_READ, text("/tmp/file.txt"))` | `if (sshSession) { ↵ String scpLocation_generator_coverage_libssh_scp_open = "value"; ↵ sshScp = ssh_scp_new(sshSession, SSH_SCP_READ, scpLocation_generator_coverage_libssh_scp_open.c_str()); ↵ if (sshScp && ssh_scp_init(sshScp) != SSH_OK) { ↵ ssh_scp_free(sshScp); ↵ sshScp = NULL; ↵ } ↵ }` |
| `libssh_scp_read_text` | Value String | VAR(field_variable), MAX_BYTES(input_value) | `libssh_scp_read_text($sshScp, math_number(1024))` | `ailyLibsshScpReadText(sshScp, 1)` |
| `libssh_scp_write_text` | Value Boolean | VAR(field_variable), FILENAME(input_value), TEXT(input_value), PERMS(input_value) | `libssh_scp_write_text($sshScp, text("file.txt"), text("hello"), math_number(0644))` | `ailyLibsshScpWriteText(sshScp, "value", "value", 1)` |
| `libssh_scp_last_size` | Value Number | (none) | `libssh_scp_last_size()` | `ailyLibsshLastScpSize` |
| `libssh_scp_close` | Statement | VAR(field_variable) | `libssh_scp_close($sshScp)` | `if (sshScp) { ↵ ssh_scp_close(sshScp); ↵ ssh_scp_free(sshScp); ↵ sshScp = NULL; ↵ }` |
| `libssh_status_code` | Value Number | CODE(dropdown) | `libssh_status_code(SSH_OK)` | `SSH_OK` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| LOG | `0`, `1`, `2`, `3`, `4` | libssh verbosity |
| STREAM | `0`, `1` | stdout or stderr |
| MODE | `SSH_SCP_READ`, `SSH_SCP_WRITE` | SCP transfer direction |
| CODE | `SSH_OK`, `SSH_ERROR`, `SSH_AUTH_SUCCESS`, `SSH_AUTH_DENIED`, `SSH_SCP_REQUEST_NEWFILE`, `SSH_SCP_REQUEST_EOF` | libssh constants |

## ABS Examples

```text
arduino_setup()
    libssh_connect_password("sshSession", text("192.168.1.10"), text("user"), text("password"), math_number(22), math_number(10), 0)
    libssh_channel_create("sshChannel", $sshSession)
    controls_if()
        @IF0: libssh_channel_exec($sshChannel, text("uname -a"))
        @DO0:
            serial_println(Serial, libssh_channel_read($sshChannel, math_number(512), math_number(1000), 0))
    libssh_channel_close($sshChannel)
    libssh_session_disconnect($sshSession, TRUE, FALSE)
```

## Notes

Network connection must already be available. SCP helpers are text-oriented; binary firmware OTA should use custom code or upstream examples.
