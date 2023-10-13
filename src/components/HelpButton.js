import "../styles/HelpButton.css";

const HelpButton = (props) => {
    const {
        target,
        showHelpMenu,
        setShowHelpMenu
    } = props;

    return <div id="help-btn">
        <a 
            href={target} 
            onClick={() => { setShowHelpMenu(prev => !prev); }}
        >?</a>
    </div>

}

export default HelpButton;