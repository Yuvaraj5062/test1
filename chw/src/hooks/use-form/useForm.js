import { useState } from "react";
import { useNavigate } from "react-router-dom";


const useForm = (options) => {
  const [data, setData] = useState(options?.initialValues || {});
  // const [place,setPlace] = useState(placeholder);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (
    key,
    number,
    sanitizeFn,
  ) => (e) => {
     
    const value = sanitizeFn ? sanitizeFn(e.target.type === 'file' ? e.target.files[0] : e.target.type === 'checkbox' ? e.target.checked : e.target.value.trimLeft()) : e.target.type === 'file' ? e.target.files[0] : e.target.type === 'checkbox' ? e.target.checked : e.target.value.trimLeft();
    const finalValue = number ? value.replace(/\D/g, '') : value
    // console.log('value in useform...???',number,value,"finalValue",finalValue);
    setData({
      ...data,
      [key]: finalValue,
    });
    // console.log("data",data)
  };
  const handleFocus = (e) => {
      return e.target.placeholder = ''
  }
  const handleSubmit = (e) => {
    if(e){
    e.preventDefault();
    }
    if(options.setIsSubmit){
    options?.setIsSubmit(true)
    }
    const validations = options?.validations;
    // console.log('valications...???',data)
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        // console.log('...value???',value);
        const validation = validations[key];
        // console.log('validation of name...??',validation)
        const pattern = validation?.pattern;
        const custom = validation?.custom;
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }
        else if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        } else if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }
      if (!valid) {
        setErrors(newErrors);
    
        // const ref = options?.ref
    
        // if(ref){
        //   for( const key in newErrors){
        //     let value = ref[key];
        //     console.log('value...???',key,value);   
        //     value && value.current && value.current.focus()
        //   }
        // }
        // options?.ref.current.focus();
        return;
      }
      else {
        options.navigate && navigate(options.navigate, { state: options?.state })
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };
  return {
    data,
    setData,
    errors,
    setErrors,
    handleChange,
    handleFocus,
    handleSubmit,
  };
}

export default useForm