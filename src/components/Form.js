import React from "react";
import { useForm } from "react-hook-form";

// Reusable Form Component
function Form({ template, onSubmit }) {
  let { register, handleSubmit, errors, watch, setError, clearErrors } =
    useForm();
  let { title, fields } = template;

  const renderFields = (fields) => {
    return fields.map((field) => {
      let { title, type, name, validationProps } = field;

      switch (type) {
        case "text":
          return (
            <div key={name}>
              <label htmlFor={name}>{title}</label>
              <input
                type="text"
                name={name}
                id={name}
                {...register(name, validationProps)}
              />
              {errors?.name && (
                <span className="red-text">{errors?.name["message"]}</span>
              )}
            </div>
          );
        case "password":
          return (
            <div key={name}>
              <label htmlFor={name}>{title}</label>
              <input
                type="password"
                name={name}
                id={name}
                {...register(name, validationProps)}
              />
              {errors?.name && (
                <span className="red-text">{errors?.name["message"]}</span>
              )}
            </div>
          );
        case "number":
          return (
            <div key={name}>
              <label htmlFor={name}>{title}</label>
              <input
                type="number"
                name={name}
                id={name}
                {...register(name, validationProps)}
              />
              {errors?.name && (
                <span className="red-text">{errors?.name["message"]}</span>
              )}
            </div>
          );
        case "email":
          return (
            <div key={name}>
              <label htmlFor={name}>{title}</label>
              <input
                type="email"
                name={name}
                id={name}
                {...register(name, validationProps)}
              />
              {errors?.name && (
                <span className="red-text">{errors?.name["message"]}</span>
              )}
            </div>
          );
        case "checkbox":
          return (
            <div key={name}>
              <label>
                <input
                  type="checkbox"
                  name={name}
                  id={name}
                  {...register(name, validationProps)}
                  />
                <span>{title}</span>
                {errors?.name && (
                  <span className="red-text">{errors?.name["message"]}</span>
                )}
              </label>
            </div>
          );
        case "url":
          return (
            <div key={name}>
              <label htmlFor={name}>{title}</label>
              <input
                type="url"
                name={name}
                id={name}
                {...register(name, validationProps)}
              />
              {errors?.name && (
                <span className="red-text">{errors?.name["message"]}</span>
              )}
            </div>
          );
        default:
          return (
            <div key={name}>
              <span className="red-text">Invalid Field</span>
            </div>
          );
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>{title}</h3>
        {renderFields(fields)}
        <br />
        <button type="submit" className="btn">
          Sign In
        </button>
      </form>
    </div>
  );
}
export default Form;