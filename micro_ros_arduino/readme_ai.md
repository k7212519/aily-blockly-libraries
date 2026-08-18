# micro-ROS Arduino

micro-ROS node, executor, and std_msgs Int32 publish/subscribe blocks.

## Library Info
- **Name**: @aily-project/lib-micro-ros-arduino
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `micro_ros_node_init` | Statement | VAR(field_input), NAME(input_value), NAMESPACE(input_value), HANDLES(input_value) | `micro_ros_node_init("microRos", text("value"), text("value"), math_number(0))` | `rcl_allocator_t microRos_allocator; ↵ rclc_support_t microRos_support; ↵ rcl_node_t microRos_node; ↵ rclc_executor_t microRos_executor; ↵ set_microros_transports(); ↵ delay(2000); ↵ microRos_allocator = rcl_get_default_allocator(); ↵ rclc_support_init(&microRos_support, 0, NULL, &microRos_allocator); ↵ rclc_node_init_default(&microRos_node, String("value").c_str(), String("value").c_str(), &microRos_support); ↵ rclc_executor_init(&microRos_executor, &microRos_support.context, 1, &microRos_allocator); ↵ rclc_executor_spin_some(&microRos_executor, RCL_MS_TO_NS(10));` |
| `micro_ros_publisher_init` | Statement | VAR(field_input), NODE(field_variable), TOPIC(input_value) | `micro_ros_publisher_init("rosPublisher", $microRos, text("value"))` | `rcl_publisher_t rosPublisher; ↵ std_msgs__msg__Int32 rosPublisher_msg; ↵ rclc_publisher_init_default(&rosPublisher, &microRos_node, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32), String("value").c_str());` |
| `micro_ros_publish_int32` | Statement | VAR(field_variable), VALUE(input_value) | `micro_ros_publish_int32($rosPublisher, math_number(0))` | `rosPublisher_msg.data = (int32_t)(1); ↵ rcl_publish(&rosPublisher, &rosPublisher_msg, NULL);` |
| `micro_ros_subscriber_init` | Statement | VAR(field_input), NODE(field_variable), TOPIC(input_value), DO(input_statement) | `micro_ros_subscriber_init("rosSubscriber", $microRos, text("value"))` | `rcl_subscription_t rosSubscriber; ↵ std_msgs__msg__Int32 rosSubscriber_msg; ↵ void rosSubscriber_callback(const void *msgin) { ↵ rosSubscriber_msg = *(const std_msgs__msg__Int32 *)msgin; ↵ } ↵ rclc_subscription_init_default(&rosSubscriber, &microRos_node, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32), String("value").c_str()); ↵ rclc_executor_add_subscription(&microRos_executor, &rosSubscriber, &rosSubscriber_msg, &rosSubscriber_callback, ON_NEW_DATA);` |
| `micro_ros_received_int32` | Value | VAR(field_variable) | `micro_ros_received_int32($rosSubscriber)` | `rosSubscriber_msg.data` |
| `micro_ros_spin` | Statement | VAR(field_variable), MS(input_value) | `micro_ros_spin($microRos, math_number(1000))` | `rclc_executor_spin_some(&microRos_executor, RCL_MS_TO_NS(1));` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    micro_ros_node_init("microRos", text("value"), text("value"), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, micro_ros_received_int32($rosSubscriber))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `micro_ros_node_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
