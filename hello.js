const e = React.createElement;

class Control extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: true,
            quiz: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.restart = this.restart.bind(this);
    };
    handleClick(){
        this.setState({
            start: false,
            quiz: true
        });
    };
    restart(){
        this.setState({
            start: true,
            quiz: false
        });
    };

    render() {
        if (this.state.start === true) {
            return e('div', null, e(Start, {handleClick: this.handleClick}))
        }
        else {
            return e('div', null, e(Quiz), 
            e('button', {onClick: this.restart}, 'Restart') 
            )
        }
    }
};

class Start extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return e(
            'div', null,
                e('h1', null, `Don't know what to eat?`),
                e('h3', null, `Take this short quiz to find out!`),
                e('button', { 
                    onClick: this.props.handleClick
                }, 'Begin!')
        )
    }
};

class Quiz extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            savory: '',
            sweet: '',
            both: ''
        }
        this.savoryQuiz = this.savoryQuiz.bind(this);
        this.sweetQuiz = this.sweetQuiz.bind(this);
        this.bothQuiz = this.bothQuiz.bind(this);
    };

    savoryQuiz() {
        this.setState({
            savory: true
        })
    };
    sweetQuiz() {
        this.setState({
            sweet: true
        })
    };
    bothQuiz() {
        this.setState({
            both: true
        })
    };
    render() {
        if(this.state.savory != true && this.state.sweet != true && this.state.both != true) {
            return e(
                'div', null,
                    e('h1', null, 'What are you craving?'),
                    e('button', {onClick: this.savoryQuiz}, 'Savory'),
                    e('p', null, ' or '),
                    e('button', {onClick: this.sweetQuiz}, 'Sweet'),
                    e('p', null, ' or '),
                    e('button', {onClick: this.bothQuiz}, 'Both'),
            )
        }
        else if(this.state.savory === true) {
            return e(SavoryQuiz)
        };
    }
};

class SavoryQuiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentNum: 1,
            choiceOne: 0,
            choiceTwo: 1,
            seenArr: ['steak', 'burger'],
            savoryArr: ['steak', 'burger', 'spaghetti', 'chips', 'barbecue', 'quesadilla', 'pad-thai', 'popcorn', 'eggs', 'burrito', 'chicken alfredo', 'bacon', 'tacos', 'macaroni and cheese', 'french fries', 'fried chicken', 'pizza', 'fish'], //-----There are 18 total-----//
            selectionArr: [],
            finalSelectionArr:[]
        }
        this.selectionOne = this.selectionOne.bind(this);
        this.selectionTwo = this.selectionTwo.bind(this);
    }
    selectionOne(){
        if (this.state.currentNum < this.state.savoryArr.length - 1) {
            this.setState({
                currentNum: this.state.currentNum + 1,
                choiceTwo: this.state.currentNum + 1,
                seenArr: [...this.state.seenArr, this.state.savoryArr[this.state.currentNum + 1]],
            })
            if (this.state.selectionArr.includes(this.state.savoryArr[this.state.choiceOne]) === false) {
                this.setState({
                    selectionArr: [ ...this.state.selectionArr, this.state.savoryArr[this.state.choiceOne]]
                })
            }
        }
    }
    selectionTwo(){
        if(this.state.currentNum <= this.state.savoryArr.length - 1) {
            this.setState({
                currentNum: this.state.currentNum + 1,
                choiceOne: this.state.currentNum + 1,
                seenArr: [...this.state.seenArr, this.state.savoryArr[this.state.currentNum + 1]]
            });
            if (this.state.selectionArr.includes(this.state.savoryArr[this.state.choiceTwo]) === false) {
                this.setState({
                    selectionArr: [...this.state.selectionArr, this.state.savoryArr[this.state.choiceTwo]]
                })
            }
        } 
    }
    render() {
        return e('div', null, e('h1', null, 'Which would you prefer?'),
        e('button', {onClick: this.selectionOne}, this.state.savoryArr[this.state.choiceOne]), 
        e('p', null, ' or '),
        e('button', {onClick: this.selectionTwo}, this.state.savoryArr[this.state.choiceTwo]),
        e('p', null, this.state.currentNum),
        e('p', null, this.state.seenArr.join(', ')),
        e('p', null, this.state.selectionArr.join(', '))
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(Control));