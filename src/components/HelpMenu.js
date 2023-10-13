import "../styles/HelpMenu.css";

const HelpMenu = (props) => {

    const {
        showHelpMenu,
        setShowHelpMenu
    } = props;

    return <div id="help-menu" className="secondary primary-border">
        <div className="scroll-div">
            <h1 className="font-secondary" id="help-label">Help</h1>
            <p className="font-primary a-label">New to cribbage? learn how to play <a href="https://en.wikipedia.org/wiki/Cribbage#Rules" target="blank" className="font-secondary">here.</a></p>

            <h2 className="font-primary">How It Works:</h2>
            <p className="font-secondary">This website is to be used as a tool to help you practice what is arguably the most fundamental skill in cribbage: discarding cards into the crib.</p>
            <p className="font-secondary">When a round starts, you will be presented with 6 random cards and told whether the crib belongs to you or your opponent. You must decide which cards to retain and which to discard in order to maximize your potential points. Once you do so, you will be presented with an analysis that compares your combination to the best combination &#40;determined by the bot&#41;.</p>

            <h2 className="font-primary">The Round Summary:</h2>
            <p className="font-secondary">The round summary breaks down the hand-crib combination you and the bot have selected and performs an analysis.</p>
            <p className="font-secondary">On the left side of the summary, you will see the cards you discarded into the crib, a hand point analysis, a crib point analysis, and a throw score. The hand point analysis will count the points that exist in your hand, total them, and tell you the average potential points for your hand when a random starter card is added to it. The crib point analysis will similarly count the points that exist in your crib cards, total them, and tell you the average potential points for your crib cards when 2 random cards &#40;what your opponent has thrown into the crib&#41; and 1 random starter card are added to it. If the crib belongs to the opponent, the crib points will be negative. The throw score is calculated by adding the potential hand score to the potential crib score.</p>
            <p className="font-secondary">The accuracy rating at the bottom of the round summary is calculated based on the ratio of your throw score and the bot&#39;s throw score. Aim for 100% accuracy each round.</p>

            <h2 className="font-primary">The Bot:</h2>
            <p className="font-secondary"> The bot uses a series of algorithms to perform calculations and run tests to determine the best hand-crib combination for a given set of 6 cards. For each of the 15 possible hand-crib combinations, the bot tallies the hand&#39;s and crib&#39;s existing and potential points and returns the combination with the highest throw score.</p>

            <h2 className="font-primary">The Leaderboard:</h2>
            <ul className="font-secondary">
                <li>Rank:&nbsp;Your position in the leaderboard based on your level in comparison to other users&#39; levels.</li>
                <li>Level:&nbsp;A representation of your experience that increases with every hand played.</li>
                <li>Average Accuracy Rating:&nbsp;The average of your last 50 hands&#39; accuracy ratings.</li>
                <li>Hit/Miss Ratio:&nbsp;The ratio of your amount of 100% accuracy rating hands to &lt;100% accuracy rating hands.</li>
                <li>Longest Hit Streak:&nbsp;The longest constant streak of 100% accuracy rating hands you have had.</li>
                <li>Highest Throw Score:&nbsp;The highest throw score you have received from a hand and crib, aka your highest overall scoring hand and crib combination.</li>
                <li>Account Creation Date:&nbsp;The date you registered your account.</li>
                <li>Account Age:&nbsp;Days passed since your account was registered.</li>
            </ul>

            <p className="font-primary a-label">Check out the code for this website <a href="https://github.com/leyuh/crib-crazy-client" target="blank" className="font-secondary">here.</a></p>
        </div>
    
        <button id="help-menu-close-btn" className="font-secondary primary" onClick={() => setShowHelpMenu(false)}>Close</button>

    </div>
}

export default HelpMenu;