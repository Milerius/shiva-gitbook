# How to create a system plugin

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

