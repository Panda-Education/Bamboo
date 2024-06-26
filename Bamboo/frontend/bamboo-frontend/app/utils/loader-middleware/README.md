

# Loader Middleware

All functions in this folder has to be executed in the `loader` function for each route. 

This is because there is no proper `middleware` in Remix, as each route is loaded in parallel.