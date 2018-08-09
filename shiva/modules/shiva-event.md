---
description: >-
  On this page you will find information about the different events that can be
  sent and received in shiva
---

# shiva::event

## Purpose

The purpose of this module is to give users the opportunity to interact through events in their program, whether in **C++** or in a **scripting language**.

## Events

| Event Name | Description | Argument |
| :---: | :---: | :---: |
| add\_base\_system | trigger an event that add a system in the system manager | std::unique\_ptr&lt;base\_system&gt; |
| after\_load\_systems\_plugins | triggers an event after the complete loading of plugged systems |  |
| after\_load\_resources | triggers an event after the complete loading resource of a scene or program |  |
| fatal\_error\_occured | triggers an event that indicates that an uncorrectable error has occurred | std::error\_code |
| quit\_game | triggers an event that indicates the end of the program | int |
| start\_game | triggers an event that indicates the beginning of the program |  |
| key\_pressed | triggers an event if the user presses a key on his keyboard | shiva::input::keyboard::TKey |
| key\_released | triggers an event if the user release a key on his keyboard | shiva::input::keyboard::TKey |
| change\_scene | triggers an event that indicates the change from one scene to another | const char\* scene\__name_ |

