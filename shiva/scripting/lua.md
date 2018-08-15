# Lua

## Events

| Functions | Description |
| :--- | :--- |
| [shiva.dispatcher:trigger\_\[event\_name\]\_event](lua.md#shiva-dispatcher-trigger_-event_name-_event) | trigger an event with the c++ dispatcher |

## Entity Registry

| Functions | Description |
| :--- | :--- |
| [shiva.entity\_registry:create](lua.md#shiva-entity_registry-create) | create an entity. |
| [shiva.entity\_registry:destroy](lua.md#shiva-entity_registry-destroy) | destroy an entity |
| [shiva.entity\_registry:nb\_entities](lua.md#shiva-entity_registry-nb_entities) | get the numbers of entities |
| [shiva.entity\_registry:has\_\[component\_name\]\_component](lua.md#shiva-entityregistry-has_-component_name-_component) | checks whether the requested component is associated with the given entity |
| [shiva.entity\_registry:get\_\[component\_name\]\_component](lua.md#shiva-entity_registry-get_-component_name-_component) | get the component linked to the given entity |

## Events API Documentation

### shiva.dispatcher:trigger\_\[event\_name\]\_event

This function trigger an event using the EnTT dispatcher.

{% hint style="info" %}
All those functions are automatically generated based on [shiva::event](../modules/shiva-event.md).
{% endhint %}

```lua
-- Global signature
shiva.dispatcher:trigger_[event_name]_event(evt_arg);

-- Example of generated one
shiva.dispatcher:trigger_quit_game_event(evt_arg);
```

**Parameters**

| Name | Description |
| :--- | :--- |
| _**evt\_arg**_ | type -&gt; constructor of the current\_event |

**Example**

```lua
function on_key_pressed(evt)
    if (evt.keycode == Keyboard.Escape) then
        -- quit_game.hpp take a integer as argument for his construction
        shiva.dispatcher:trigger_quit_game_event(1)
    end
end
```

## Entity Registry API Documentation

### shiva.entity\_registry:create

This function create an entity through the EnTT registry and return an unique identifier.

```lua
shiva.entity_registry:create();
```

**Return value**

| Possible name | Description |
| :--- | :--- |
| _**entity\_id**_ | `integer` |

**Example**

```lua
function foo()
    local entity_id = shiva.entity_registry:create()
end
```

### shiva.entity\_registry:destroy

This function destroy an entity through the EnTT registry.

```lua
shiva.entity_registry:destroy(entity_id);
```

**Parameters**

| Name | Description |
| :--- | :--- |
| _**entity\_id**_ | `integer` |

**Example**

```lua
function foo()
    local id = shiva.entity_registry:create()
    shiva.entity_registry:destroy(id)
end
```

### shiva.entity\_registry:nb\_entities

This function retrieve the number of entities through the EnTT registry

```lua
shiva.entity_registry:nb_entities()
```

**Return value**

| Possible name | Description |
| :--- | :--- |
| _**nb\_entities**_ | `integer` |

**Example**

```lua
function foo()
    local id = shiva.entity_registry:create()
    assert(shiva.entity_registry:nb_entities() == 1)
    shiva.entity_registry:destroy(id)
    assert(shiva.entity_registry:nb_entities() == 0)
end
```

### shiva.entity\__registry:has\__\[component\_name\]\_component

This function checks whether the requested component is associated with the given entity through the EnTT registry

{% hint style="info" %}
All those functions are automatically generated based on the common components.
{% endhint %}

```lua
-- Global signature
shiva.entity_registry:has_[component_name]_component(entity_id);

-- Example of generated one
shiva.entity_registry:has_layer_1_component(entity_id);
```

**Parameters**

| Name | Description |
| :--- | :--- |
| _**entity\_id**_ | `integer` |

**Return value**

| Possible name | Description |
| :--- | :--- |
| _**result**_ | `boolean` |

**Example**

```lua
function foo()
    local entity_id = shiva.entity_registry:create()
    local component = shiva.entity_registry:add_layer_1_component(entity_id)
    local same_component = shiva.entity_registry:get_layer_1_component(entity_id)
    assert(shiva.entity_registry:has_layer_1_component(entity_id) == true, "should be true")
    shiva.entity_registry:remove_layer_1_component(entity_id)
    assert(shiva.entity_registry:has_layer_1_component(entity_id) == false, "should be false")
end
```

### shiva.entity\_registry.get\_\[component\_name\]\_component

This function takes an entity as a parameter and retrieves the component associated with it.

{% hint style="info" %}
All those functions are automatically generated based on the common components.
{% endhint %}

```cpp
-- Global signature
shiva.entity_registry:get_[component_name]_component(entity_id);

-- Example of generated one
shiva.entity_registry:get_layer_1_component(entity_id);
```

**Parameters**

| Name | Description |
| :--- | :--- |
| _**entity\_id**_ | `integer` |

**Return value**

| Possible Name | Description |
| :--- | :--- |
| _**same\_component**_ | `Component &` |

**Example**

```lua
function foo()
    local entity_id = shiva.entity_registry:create()
    local component = shiva.entity_registry:add_layer_1_component(entity_id)
    local same_component = shiva.entity_registry:get_layer_1_component(entity_id)
    assert(shiva.entity_registry:has_layer_1_component(entity_id) == true, "should be true")
    shiva.entity_registry:remove_layer_1_component(entity_id)
    assert(shiva.entity_registry:has_layer_1_component(entity_id) == false, "should be false")
end
```

