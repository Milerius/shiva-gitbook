---
description: >-
  In this page you will find all the information you need on the ecs part of
  shiva, the api of the different class, the game loop architecture, examples
---

# shiva::ecs

## How works the System

### Systems

SFME have 3 differents kinds of systems:

* **PreUpdate**: These systems are the first to be updated in the game loop, they are generally used to retrieve user input, or manage network events for example.
* **LogicUpdate**: These systems are the second to be updated in the game loop, they are generally used for game logic such as movement or collisions for example.
* **PostUpdate**: These systems are the last to be updated in the game loop, they are generally used for rendering or interpolation for example.

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

![complete diagram](../../.gitbook/assets/code2flow_99b09.png)

![simple diagram](../../.gitbook/assets/code2flow_3c3ba.png)

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

**Parameters**

* **entt::dispatcher** The `dispatcher` will be provided to the system when it is created.
* **entt::entity\_registry** The `entity_registry` will be provided to the system when it is created.
* ​[plugins\_registry](https://shiva.gitbook.io/project/~/edit/drafts/-LGoUJOpBxBYAeCO4Ght/shiva/modules/shiva-dll#plugins_registry-api) registry of the plugged systems
{% endtab %}

{% tab title="Functions" %}
| Function Name | Description |
| --- | :---: |
| [update](shiva-ecs.md#update) | update the systems |
| [get\_system](shiva-ecs.md#get_system) | get a single system |
| [get\_systems](shiva-ecs.md#get_systems) | get multiple systems |
| [has\_system](shiva-ecs.md#has_system) | check if a system is present |
| [has\_systems](shiva-ecs.md#has_systems) | check if multiple systems are present |
| [mark\_system](shiva-ecs.md#mark_system) | mark a single system |
| [mark\_systems](shiva-ecs.md#mark_systems) | mark multiple systems |
| [enable\_system](shiva-ecs.md#enable_system) | enable a single system |
| [enable\_systems](shiva-ecs.md#enable_systems) | enable multiple systems |
| [disable\_system](shiva-ecs.md#disable_system) | disable a single system |
| [disable\_systems](shiva-ecs.md#disable_systems) | disable multiple systems |
| [create\_system](shiva-ecs.md#create_system) | create a single system |
| [load\_systems](shiva-ecs.md#load_systems) | create multiple systems |
{% endtab %}
{% endtabs %}

#### update

```cpp
size_t update() noexcept
```

**Return value**

* number of systems successfully updated

**Notes**

This is the function that will update your **systems**. Based on the logic of the different kinds of [shiva systems](shiva-ecs.md#how-works-the-system), this function will take care of updating your systems in the right order.

{% hint style="info" %}
If you have not loaded any system into the **system\_manager** the function will return 0.

If you decide to mark a system, it will be automatically **deleted** at the next loop turn through this function.
{% endhint %}

#### get\_system

```cpp
template <typename TSystem>
const TSystem &get_system() const;

template <typename TSystem>
TSystem &get_system();
```

**Template parameters**

* **TSystem** Represents the system to get

**Return value**

* **TSystem&** Return a reference to the system obtained

{% hint style="danger" %}
**Throw** a `std::logic_error` if the system could not be obtained correctly or if it was never loaded.
{% endhint %}

#### get\_systems

```cpp
template <typename ...Systems>
std::tuple<std::add_lvalue_reference_t<Systems>...> get_systems();

template <typename ...Systems>
std::tuple<std::add_lvalue_reference_t<std::add_const_t<Systems>>...> get_systems() const
```

**Template parameters**

* **Systems** Represents a list of systems to get

**Return value**

* **Tuple** of  systems obtained. 

{% hint style="info" %}
This function recursively calls the [get\_system](shiva-ecs.md#get_systems) function
{% endhint %}

#### has\_system

```cpp
template <typename TSystem>
bool has_system() const noexcept;
```

**Template parameters**

* **TSystem** Represents the system that needs to be verified

**Return value**

* **true** if the system has been  loaded, **false** otherwise

#### has\_systems

```cpp
template <typename ... Systems>
bool has_systems() const noexcept
```

**Template parameters**

* **Systems** Represents a list of systems that needs to be verified

**Return value**

* **true** if the list of systems has been loaded, **false** otherwise

{% hint style="info" %}
This function recursively calls the [has\_system](shiva-ecs.md#has_system) function
{% endhint %}

#### mark\_system

```cpp
 template <typename TSystem>
 bool mark_system() noexcept
```

**Template parameters**

* **TSystem** Represents the system that needs to be marked

**Return value**

* **true** if the system has been marked, **false** otherwise

{% hint style="info" %}
This function marks a system that will be destroyed at the next turn of the game loop.
{% endhint %}

#### mark\_systems

```cpp
 template <typename ... Systems>
 bool mark_systems() noexcept
```

**Template parameters**

* **Systems** Represents a list of systems that needs to be marked

**Return value**

* **true** if  the list of systems has been marked, **false** otherwise

{% hint style="info" %}
This function recursively calls the [mark\_system](shiva-ecs.md#mark_systems) function
{% endhint %}

#### enable\_system

```cpp
template <typename TSystem>
bool enable_system() noexcept
```

**Template parameters**

* **TSystem** Represents the system that needs to be enabled.

**Return value**

* **true** if the system has been enabled, **false** otherwise

#### **enable\_systems**

```cpp
template <typename ... Systems>
bool enable_systems() noexcept
```

**Template parameters**

* **Systems** Represents a list of systems that needs to be enabled

**Return value**

* **true** if the list of systems has been enabled, **false** otherwise

{% hint style="info" %}
This function recursively calls the [enable\_system](shiva-ecs.md#enable_system) function
{% endhint %}

#### disable\_system

```cpp
 template <typename TSystem>
 bool disable_system() noexcept
```

**Template parameters**

* **TSystem** Represents the system that needs to be disabled

**Return value**

* **true** if the the system has been disabled, **false** otherwise

{% hint style="info" %}
If you deactivate a system, it will not be destroyed but simply ignore during the game loop
{% endhint %}

#### disable\_systems

```cpp
 template <typename ... Systems>
 bool disable_systems() noexcept
```

#### Template parameters

* **Systems** Represents a list of systems that needs to be disabled

**Return value**

* **true** if the list of systems has been disabled, **false** otherwise

{% hint style="info" %}
This function recursively calls the [disable\_system](shiva-ecs.md#disable_system) function
{% endhint %}

#### create\_system

```cpp
template <typename TSystem, typename ... SystemArgs>
TSystem &create_system(SystemArgs &&...args)
```

#### Template parameters

* **TSystem** represents the type of system to create
* **SystemArgs** represents the arguments needed to construct the system to create

#### Return value

* Returns a reference to the created system

#### load\_systems

```cpp
template <typename ...TSystems>
std::tuple<std::add_lvalue_reference_t<Systems>...> load_systems()

template <typename ...TSystems>
std::tuple<std::add_lvalue_reference_t<std::add_const_t<Systems>>...> load_systems()
```

**Template parameters**

* **TSystems** represents a list of systems to be loaded

**Return value**

* **Tuple** of systems loaded

{% hint style="warning" %}
This function calls [get\_systems](shiva-ecs.md#get_systems) and can therefore potentially **throw**
{% endhint %}

## base\_system

### Usage

base class of shiva systems

### Diagram

![base\_system](../../.gitbook/assets/baseclass.png)

{% tabs %}
{% tab title="Signature" %}
```cpp
class base_system;
```
{% endtab %}

{% tab title="Constructor" %}
```cpp
explicit base_system(entt::dispatcher &dispatcher,
                     entt::entity_registry &entity_registry,
                     const float &fixed_delta_time) noexcept
```
{% endtab %}

{% tab title="Functions" %}

{% endtab %}
{% endtabs %}

