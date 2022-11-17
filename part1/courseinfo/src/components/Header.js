const Header = (props) => {
    
    console.log('In Header', props);
    const {name} = props;

    return (
        <h1>{name}</h1>
    )
}

export default Header
