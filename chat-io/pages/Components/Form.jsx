const Form = ({ children, ...formprops}) => (
    <form {...formprops}>{children}</form>
);

export default Form;