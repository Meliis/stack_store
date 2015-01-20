# Angular

## Use of Factories
- Excellent use of factories and $resource, no $http calls were made in the controllers
    + Cart, Order and Product were especially impressive and using methods in the frontend Resources
    
### Controllers 
- Controllers were mostly very good, lightweight and heavily using the backend services
    - ProductAdd is long, consider moving something like filepicker into a directive instead of having it in controller
    - CheckoutCtrl: Stripe code should be factored out into another directive.  Also, the publishable key should definitely not be in the controller, it should be a value injectable so that you can test it in various environments with different values
    - Not sure about addListener on line 17
    - Adding prices should be careful in using floating point arithmetic

### Directives
- The States Directive was cool 

### Views

- Frontend views were good, good separation of logic between your HTML and Controllers

### General

Very impressive front-end work, good understanding of Angular and how to use various components of it!
