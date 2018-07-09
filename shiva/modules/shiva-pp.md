# shiva::pp

## shiva::pp

**shiva::pp** provides basic preprocessing utilities.

### pp\_stringify, pp\_stringviewify

The `pp_stringify` macro allows converting its parameter to a string litteral.

```cpp
pp_stringify(param)
```

```cpp
const char *str = pp_stringify(hello);
//str is now "hello"
```

The `pp_stringviewify` macro allows converting its parameter to a `constexpr std::string_view`.

```cpp
pp_stringviewify(param)
```

```cpp
constexpr std::string_view sv = pp_stringviewify(hello);
//sv is now {"hello", 5}
```

### pp\_paste

The `pp_paste` macro allows concatenating its parameters together to form a new token.

```cpp
pp_paste(param1, param2)
```

```cpp
int var1 = 1;
pp_paste(var, 1) = 2;
//var1 is now 2
```

### pp\_first\_arg

The `pp_first_arg` macro allows extracting the first parameter from a variadic macro parameter list \(usually represented as `__VA_ARGS__`\).

```cpp
pp_first_arg(...)
```

```cpp
int first = pp_first_arg(1, 2, 3);
//first is now 1
```

### pp\_count\_args

The `pp_count_args` macro allows counting the number of parameters passed to a variadic macro.

```cpp
pp_count_args(...)
```

```cpp
int nb = pp_count_args(1, 2, 3, 4, 5);
//nb is now 5
```

### pp\_for\_each

The `pp_for_each` macro allows applying a given macro to each argument of a variadic macro parameter list.

```cpp
pp_for_each(apply, ...)
```

```cpp
#define doubleParam(a)      (a * 2),

std::vector<int> v{pp_for_each(doubleParam, 1, 2, 3)};
//v is now {2, 4, 6}
```

```cpp
#define incrementIBy(nb)    i += nb;

int i = 0;
pp_for_each(incrementIBy, 1, 2, 3);
//i is now 6
```

