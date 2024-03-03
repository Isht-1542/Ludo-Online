
const Dicefront = ({nu}) => {

    var colorArray = ["blue", "red", "green", "yellow"];
    let color = colorArray[nu];

    return (
        <div className="dicefront">
            <div className={`face1 front bg-${color}-500`}></div>
            <div className={`face1 back bg-${color}-500`}>
                <div className="dot six-1"></div>
                <div className="dot six-2"></div>
                <div className="dot six-3"></div>
                <div className="dot six-4"></div>
                <div className="dot six-5"></div>
                <div className="dot six-6"></div>
            </div>
            <div className={`face1 top bg-${color}-500`}>
                <div className="dot two-1"></div>
                <div className="dot two-2"></div>
            </div>
            <div className={`face1 bottom bg-${color}-500`}>
                <div className="dot five-1"></div>
                <div className="dot five-2"></div>
                <div className="dot five-3"></div>
                <div className="dot five-4"></div>
                <div className="dot five-5"></div>
            </div>
            <div className={`face1 right bg-${color}-500`}>
                <div className="dot four-1"></div>
                <div className="dot four-2"></div>
                <div className="dot four-3"></div>
                <div className="dot four-4"></div>
            </div>
            <div className={`face1 left bg-${color}-500`}>
                <div className="dot three-1"></div>
                <div className="dot three-2"></div>
                <div className="dot three-3"></div>
            </div>
        </div>
    )
}

export default Dicefront