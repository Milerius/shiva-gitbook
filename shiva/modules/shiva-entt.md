# shiva::entt

## Intro

This module simply makes a **namespace alias** to use [EnTT](https://github.com/skypjack/entt). This module is represented by a cmake interface library that facilitates its handling through other modules.  
But also small changes to avoid situations of ambiguous code related to scripting

{% code-tabs %}
{% code-tabs-item title="shiva/entt/entt.hpp" %}
```cpp
namespace shiva::entt
{
    using dispatcher = ::entt::Dispatcher;

    class entity_registry : public ::entt::DefaultRegistry
    {
    public:
        //! Reflection
        reflect_class(entity_registry);

        using base_class_t = ::entt::DefaultRegistry;

        static constexpr auto reflected_functions() noexcept
        {
            using namespace std::string_view_literals;
            return meta::makeMap("destroy"sv, &entity_registry::destroy_entity,
                                 reflect_function(&entity_registry::create));
        }

        void destroy_entity(const base_class_t::entity_type entity)
        {
            return base_class_t::destroy(entity);
        }

        static constexpr auto reflected_members() noexcept
        {
            return meta::makeMap();
        }
    };
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

