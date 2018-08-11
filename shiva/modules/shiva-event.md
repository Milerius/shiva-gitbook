---
description: >-
  On this page you will find information about the different events that can be
  sent and received in shiva
---

# shiva::event

## Purpose

The purpose of this module is to give users the opportunity to interact through events in their program, whether in **C++** or in a **scripting language**.

## Events

| Event Name | Description |
| :---: | :---: |
| [add\_base\_system](shiva-event.md#add_base_system) | trigger an event that add a system in the system manager |
| [after\_load\_systems\_plugins](shiva-event.md#after_load_systems_plugins) | triggers an event after the complete loading of plugged systems |
| after\_load\_resources | triggers an event after the complete loading resource of a scene or program |
| fatal\_error\_occured | triggers an event that indicates that an uncorrectable error has occurred |
| quit\_game | triggers an event that indicates the end of the program |
| start\_game | triggers an event that indicates the beginning of the program |
| key\_pressed | triggers an event if the user presses a key on his keyboard |
| key\_released | triggers an event if the user release a key on his keyboard |
| change\_scene | triggers an event that indicates the change from one scene to another |

{% hint style="info" %}
All events are default constructible.
{% endhint %}

### add\_base\_system

{% tabs %}
{% tab title="Constructor" %}
```cpp
add_base_system(std::unique_ptr<shiva::ecs::base_system> system_ptr_ = nullptr) noexcept
```
{% endtab %}

{% tab title="Example" %}
```cpp
#include <memory>
#include <shiva/event/add_base_system.hpp>
#include "conrete_system.hpp"

shiva::entt::dispatcher dispatcher;

dispatcher.trigger<shiva::event::add_base_system>(
std::make_unique<concrete_system>(...));
```
{% endtab %}
{% endtabs %}

### after\_load\_systems\_plugins

{% tabs %}
{% tab title="Constructor" %}
{% hint style="info" %}
This event has no constructor
{% endhint %}
{% endtab %}

{% tab title="Example" %}
```cpp
#include <memory>
#include <shiva/event/after_load_systems_plugins.hpp>

shiva::entt::dispatcher dispatcher;

dispatcher.trigger<shiva::event::after_load_systems_plugins>();
```

{% hint style="info" %}
This event is already triggered by the [system\_manager](shiva-ecs.md#system_manager) in the function [load\_plugins](shiva-ecs.md#load_plugins)\(\).
{% endhint %}

{% hint style="warning" %}
We recommend that you do not trigger this event unless you use your own system manager.
{% endhint %}
{% endtab %}
{% endtabs %}

### after\_load\_resources

{% tabs %}
{% tab title="Constructor" %}
{% hint style="info" %}
This event has no constructor
{% endhint %}
{% endtab %}

{% tab title="Example" %}
```cpp
#include <memory>
#include <shiva/event/after_load_resources.hpp>

shiva::entt::dispatcher dispatcher;
dispatcher.trigger<shiva::event::after_load_resources>();
```

{% hint style="success" %}
You can find a more concrete example in the source code [here](https://github.com/Milerius/shiva/blob/master/modules/sfml/shiva/sfml/resources/sfml-resources-registry.hpp#L333)
{% endhint %}
{% endtab %}
{% endtabs %}

