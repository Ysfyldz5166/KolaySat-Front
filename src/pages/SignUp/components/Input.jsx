/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
export function Input( props){
    // eslint-disable-next-line no-unused-vars
    const {id,label,error,onChange, type} =props
    return (
        <><><label htmlFor={id} className="form-label">
            {label}
        </label>
            <input
                className={error ? "form-control is-invalid" : "form-control"}
                id="username"
                onChange={onChange}
                type={type}
                />
        </><div className="invalid-feedback">{error}</div></>
    )
}
