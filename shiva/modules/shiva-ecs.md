# shiva::ecs



## How works the System

### Systems

SFME have 3 differents kinds of systems:

*  **PreUpdate**: These systems are the first to be updated in the game loop, they are generally used to retrieve user input, or manage network events for example.
*  **LogicUpdate**: These systems are the second to be updated in the game loop, they are generally used for game logic such as movement or collisions for example.
*  **PostUpdate**: These systems are the last to be updated in the game loop, they are generally used for rendering or interpolation for example.

The pseudo code will look like this:

```cpp
auto update_system_functor = [&nb_systems_updated](auto &&sys) {
                if (sys->is_enabled()) {
                    sys->update();
                    nb_systems_updated++;
                }
            };

shiva::ranges::for_each(systems_, [this, update_system_functor](auto &&vec) {
     if (!vec.empty()) {
        system_type current_system_type = vec.front()->get_system_type_RTTI();
        shiva::ranges::for_each(this->systems_[current_system_type],
        [this, current_system_type, update_system_functor](auto &&sys) {
               if (current_system_type != system_type::logic_update) {
                  update_system_functor(std::forward<decltype(sys)>(sys));
                  } else {
                  timestep_.start_frame();
                  while (timestep_.is_update_required()) {
                        update_system_functor(std::forward<decltype(sys)>(sys));
                        timestep_.perform_update();
                        }
                  }
              });
        };
});
```

{% hint style="info" %}
This game loop is based on the gafferon on games tutorial: [Fix your timestep](https://gafferongames.com/game-physics/fix-your-timestep).
{% endhint %}

### Diagram

![game loop](../../.gitbook/assets/code2flow_99b09.png)

## system\_manager

### Usage

This class will manage the **systems** of the entity component system. You will be able to `add`, `remove`, `retrieve` , `update` or `delete` systems through it.

### Diagram

![system\_manager](../../.gitbook/assets/diagram.png)

### system\_manager\_api

{% tabs %}
{% tab title="Signature" %}
```cpp
class system_manager;
```
{% endtab %}

{% tab title="Constructor" %}
```cpp
explicit system_manager(entt::dispatcher &dispatcher,
                                entt::entity_registry &registry,
                                plugins_registry_t &plugins_registry) noexcept;
```
{% endtab %}

{% tab title="Functions" %}
#### update

```cpp
size_t update() noexcept
```

#### Return value

* number of systems successfully updated

{% hint style="info" %}
If you have not loaded any system into the `system_manager` the function will return 0.
{% endhint %}
{% endtab %}
{% endtabs %}

