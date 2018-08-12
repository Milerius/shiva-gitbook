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
| shiva.entity\_registry:nb\_entities | get the numbers of entities |

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

