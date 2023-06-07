function Validator(options) {
    function getParent(element, selectors) {
        while (element.parentElement) {
            if(element.parentElement.matches(selectors)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    selectorRules = {};
    //Hàm thực hiện validate
    function Validate(inputElement, rule) {
           var errorElement = getParent(inputElement, options.groupSelector).querySelector(options.errorSelector);
           var errorMessage;

           // Lấy ra các rule
           var rules = selectorRules[rule.selectors]
           // Lặp qua từng rule và kiểm tra nếu có lỗi thì break
           for(var i = 0; i < rules.length; ++i) {
            switch(inputElement.type)  {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selectors + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);

            }
            /*if(!rules[i](inputElement.value)) {
                break; */
            
     
                if(errorMessage) break;
           }

           if(errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.groupSelector).classList.add('invalid')
           } else {
            errorElement.innerText = '';
            getParent(inputElement, options.groupSelector).classList.remove('invalid')
           }
           return !errorMessage
    }
    const formElement = document.querySelector(options.form);
    
    if(formElement) {
        // Submit
       formElement.onsubmit = function(e) {
            e.preventDefault();
            
            var isFormValid = true;

            options.rules.forEach(function(rule)  {
                var inputElement = formElement.querySelector(rule.selectors)
                var isValid = Validate(inputElement, rule) 
                if(!isValid) {
                    isFormValid = false;
                }
            });
            
            if(isFormValid) {
                if(typeof options.onSubmit === 'function') {

                    var ennableInput = formElement.querySelectorAll('[name]');
                   
                    var formValues = Array.from(ennableInput).reduce(function (values, input) {
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            case 'checkbox':
                               if(!input.matches(':checked')) return values;
                               if(!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                               }
                               values[input.name].push(input.value)
                                break;
                            case 'file':
                                values[input.name] = input.files
                                break;
                            default:
                                values[input.name] = input.value
                        }
                        
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                    } else {
                    formElement.submit();
                    }
               
            }
        }   
        
        // Lặp qua rule 
        options.rules.forEach(function(rule)  {
            if(Array.isArray(selectorRules[rule.selectors])) {
                selectorRules[rule.selectors].push(rule.test);
            } else {
                selectorRules[rule.selectors] = [rule.test]
            }
            //Lấy element của form cần validate
            var inputElementS = formElement.querySelectorAll(rule.selectors);

            Array.from(inputElementS).forEach(function(inputElement) {
                inputElement.onblur = function() {
                    // =>>>>>        
                        Validate(inputElement, rule);
                    }
                    // Xử lý khi đang nhập thì không lỗi nữa
                        inputElement.oninput = function() {
                            var errorElement = getParent(inputElement, options.groupSelector).querySelector('.form-message');
                            errorElement.innerText = '';
                            getParent(inputElement, options.groupSelector).classList.remove('invalid')
                        }
                    
            })
           
        
            
        });
    }
}

Validator.isRequired = function(selectors, trust) {
    return {
        selectors: selectors,
        test: function(value) {
            return value ? undefined : trust || 'Yêu cầu nhập trường này'
        }
    }

}

Validator.isEmail = function(selectors) {
    return {
        selectors: selectors,
       
        test: function(value) {
            var regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Yêu cầu nhập trường này phải là Email';
        }
        
    }
}


Validator.minLength = function(selectors, min, trust) {
    return {
        selectors: selectors,
        test: function(value) {   
            return value.length >= min ? undefined : trust || `Phải nhập tối thiểu ${min} kí tự`;
        }
    }
}

Validator.isConfirm = function(selectors, getConfirm, trust) {
    return {
        selectors: selectors,
        test: function(value) {   
            return value === getConfirm() ? undefined : trust || 'Không đúng trường giá trị';
        }
    }
}