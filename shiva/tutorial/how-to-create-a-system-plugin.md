# How to create/build/install a system plugin

## Let's write some code

To start create two files **system\_example\_plugin.hpp** and **system\_example\_plugin.cpp**

{% code-tabs %}
{% code-tabs-item title="system\_example\_plugin.hpp" %}
```cpp
#include <shiva/entt/entt.hpp>
#include <shiva/ecs/system.hpp>

namespace my_game::plugins
{
    //! Depending on the system_type, the inheritance can be different.
    class system_example final : public shiva::ecs::post_update_system<system_example>
    {
    public:
        //! Destructor
        ~system_example() noexcept final = default;
        
        /* Only this constructor is allowed in plugins */
        //! Constructor
        system_example(shiva::entt::dispatcher &dispatcher,
                       shiva::entt::entity_registry &registry,
                       const float &fixed_delta_time) noexcept;
        
       //! The creator function (entry point of your plugins)
       //! Return should always be a unique_ptr on base_system in plugins
        static std::unique_ptr<shiva::ecs::base_system> system_creator(entt::dispatcher &dispatcher,
                                                                       entt::entity_registry &registry,
                                                                       const float &fixed_delta_time) noexcept;
    
       //! override from base_system
       //! The logic of the system will be inside this function
       void update() noexcept final;
       
                                    
        //! Reflection (mandatory by a type_traits)
        reflect_class(render_system)
        static constexpr auto reflected_functions() noexcept;
        static constexpr auto reflected_members() noexcept;                                                                 
    private:
        //! You can have additional data here
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="system\_example\_plugin.cpp" %}
```cpp
#include <boost/dll.hpp> //! For BOOST_DLL_ALIAS
#include "system_example_plugin.hpp"

namespace my_game::plugins
{
    //! Implementation of the constructor
    system_example::system_example(shiva::entt::dispatcher &dispatcher, shiva::entt::entity_registry &registry,
                                   const float &fixed_delta_time) noexcept :
        system(dispatcher, registry, fixed_delta_time, true) //! true means im_a_plugin
    {
        //! You can set user data here if you want to share data betweens plugins
        user_data_ = /* whatever you want */;
        
        //! Also if you need to initialize some things for the system is here.
    }
    
     //! The creator factory implementation
     std::unique_ptr<shiva::ecs::base_system> example_system::system_creator(shiva::entt::dispatcher &dispatcher,
                                                                           shiva::entt::entity_registry &registry,
                                                                           const float &fixed_delta_time) noexcept
    {
        return std::make_unique<my_game::plugins::system_example>(dispatcher, registry, fixed_delta_time);
    }
    
    //! override from base system
    void system_example::update() noexcept
    {
        /* Write your code here. */
    }
    
    //! Reflection
    constexpr auto system_example::reflected_functions() noexcept
    {
        return meta::makeMap(reflect_function(&system_example::update));
    }

    constexpr auto system_example::reflected_members() noexcept
    {
        return meta::makeMap();
    }
}

BOOST_DLL_ALIAS(
    my_game::plugins::system_example::system_creator, // <-- this function is exported with... (from boost)
    create_plugin                               // <-- ...this alias name (from boost)
)
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## How to share data between plugins \(without the dispatcher\)

{% hint style="warning" %}
We assume here that you have set the user\_data as shown in the example above
{% endhint %}

{% code-tabs %}
{% code-tabs-item title="sfml-example.hpp" %}
```cpp
namespace shiva::examples::sfml
{
    class example_world : public shiva::world
    {
    public:
        ~example_world() noexcept = default;

        example_world() noexcept
        {
            bool res = system_manager_.load_plugins();
            if (!res) {
                std::cerr << "error loading plugins" << std::endl;
            } else {
                auto &lua_system = system_manager_.create_system<shiva::scripting::lua_system>();
                auto render_system = system_manager_.get_system_by_name("render_system",
                                                                        shiva::ecs::system_type::post_update);
                auto input_system = system_manager_.get_system_by_name("input_system",
                                                                       shiva::ecs::system_type::pre_update);
                auto resources_system = system_manager_.get_system_by_name("resources_system",
                                                                           shiva::ecs::system_type::pre_update);
                auto animation_system = system_manager_.get_system_by_name("animation_system",
                                                                           shiva::ecs::system_type::logic_update);
                if (render_system != nullptr &&
                    animation_system != nullptr &&
                    resources_system != nullptr &&
                    input_system != nullptr) {
                    resources_system->set_user_data(&lua_system.get_state());
                    animation_system->set_user_data(&lua_system.get_state());
                    input_system->set_user_data(render_system->get_user_data());
                    lua_system.load_all_scripted_systems();
                }
            }
        }
    };
}


```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="success" %}
In the example you see above which is directly derived from the shiva [code](https://github.com/Milerius/shiva/blob/master/tools/game_templates/sfml/project_name/world/project_name_world.hpp) for the [shiva-sfml](../modules/shiva-sfml/) module, I needed to share the **SFML** window in several different [modules](../modules/), for input and rendering, for example. through functions like set\_user\_data && get\_user\_data, I'm able to transfer data that only concerns plugins.
{% endhint %}

## How to subscribe/emit event from a system plugin \(or header-only\)

Here's an example of how you could do it

```cpp
//! system_example.hpp
class system_example
{
public:
 /* ... other class things */
 
 //! Callback (you will receive the event in this function)
 void receive(const shiva::event::key_pressed &evt);
};

//! system_example.cpp        
system_example::system_example(shiva::entt::dispatcher &dispatcher, shiva::entt::entity_registry &registry,
                                   const float &fixed_delta_time) noexcept :
system(dispatcher, registry, fixed_delta_time, true) //! true means im_a_plugin
{
        //! You can set user data here if you want to share data betweens plugins
        user_data_ = /* whatever you want */;
        
        //! Also if you need to initialize some things for the system is here.
        
        //! Subscribe to an event
        this->dispatcher_.sink<shiva::event::key_pressed>().connect(this);
        
        //! emit an event
        this->dispatcher_.trigger<shiva::event::key_pressed>(shiva::input::keyboard::TKey::A);
}

void system_example::receive(const shiva::event::key_pressed &evt)
{
        //! Treat your event here
}
```

## CMake

Here are two examples of CMake possible for the implementation of a plugin with shiva, one in the project directly if you are contributors, one externally if you make plugins for shiva in another repository

### Inside shiva project

```cpp
include(shiva/${module_name}/CMakeSources.cmake)
set(MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR})
CREATE_MODULE_PLUGIN(shiva::${module_name} "${MODULE_SOURCES}" ${MODULE_PATH} "systems" "${module_name}/shiva")
target_link_libraries(${module_name} PUBLIC shiva::ecs)
AUTO_TARGETS_PLUGINS_INSTALL(${module_name} shiva-${module_name})
```

{% hint style="success" %}
You can find a more concrete example [here](https://github.com/Milerius/shiva/blob/master/modules/sfml/CMakeLists.txt).
{% endhint %}

### Outside shiva project

```haskell
find_package(shiva CONFIG REQUIRED)
file(GLOB_RECURSE MODULE_NAME_SOURCES ${module_name}/*.cpp prerequisites/*.cpp)
file(GLOB_RECURSE MODULE_NAME_HEADERS ${module_name}/*.hpp)
add_library(${module_name} SHARED ${MODULE_NAME_SOURCES} ${MODULE_NAME_HEADERS})
target_link_libraries(${module_name} PUBLIC
        shiva::shiva
        ${LUA_LIBRARIES}) ##! additional libraries
 set_target_properties(${module_name}
            PROPERTIES
            LIBRARY_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/bin/${CMAKE_BUILD_TYPE}/systems")

```

## Additional hints

{% hint style="warning" %}
If some things seem complicated, or parts not included in this tutorial, you will find more information on the following pages:

* [shiva::ecs](../modules/shiva-ecs.md)
* [shiva::entt](../modules/shiva-entt.md)
* [shiva::event](../modules/shiva-event.md)
* [shiva::input](../modules/shiva-input.md)
{% endhint %}

