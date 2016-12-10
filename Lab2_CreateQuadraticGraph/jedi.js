/**
 * Created by strongheart on 12/2/16.
 */
function calcRoots(a, b, c){
    roots = [];
    if(a != 0) {
        var delta = Math.pow(b, 2) - 4 * a * c;
        if (delta > 0) {
            roots.push((-b + Math.sqrt(delta)) / (2 * a));
            roots.push((-b - Math.sqrt(delta)) / (2 * a));
        }else if(delta == 0){
            roots.push((-b) / (2 * a));
        }else{
            roots.push(math.divide(math.add(math.complex(-b,0), math.sqrt(delta)), math.complex(2*a,0)));
            roots.push(math.divide(math.subtract(math.complex(-b,0), math.sqrt(delta)),math.complex(2*a,0)));
        }
    }else {
        if (b != 0) {
            roots.push(-c / b);
        }
    }
    return roots;
}

function showSolutionAlert(roots) {
    switch(roots.length){
        case 0:
            alert("You entered an invalid equation\n" + "Try entering another");
            break;
        case 1:
            alert("Solution is given below\n" + "solution = " + roots[0]);
            break;
        case 2:
            alert("Solution is given below\n" + "solution1 = " + roots[0]
                + "\nsolution2 = " + roots[1]);
    }
}


function extract_coef(quadraticEquationString){
    var coef = [];
    console.log(quadraticEquationString);
    var pattern = /(^([\+\-]?\d*x\^2)([\+\-]\d*x)?([\+\-]\d+)?\=[\+\-]?\d+$)|(^([\+\-]?\d*x\^2)?([\+\-]?\d*x)([\+\-]\d+)?\=[\+\-]?\d+$)/;
    if (pattern.test(quadraticEquationString)==true){
        var re1 = /[\+\-]?\d*x\^2/;
        var re2 = /[\+\-]?\d*x[\+\-]|[\+\-]?\d*x\=/;
        var re3 = /[\+\-]\d+\=/;
        var re4 = /\=[\+\-]?\d+/;

        var first_coef = quadraticEquationString.match(re1);
        if(first_coef != null) {
            first_coef = first_coef[0].replace(/x\^2/, "");
            if (isNaN(first_coef)) {
                switch (first_coef) {
                    case "-":
                        coef.push(-1);
                        break;
                    case "+":
                        coef.push(1);
                        break;
                }
            }else if(first_coef == ""){
                coef.push(1);
            }else{
                first_coef = parseInt(first_coef);
                coef.push(first_coef);
            }
        }else{
            coef.push(0);
        }

        var second_coef = quadraticEquationString.match(re2);
        if(second_coef != null) {
            second_coef = second_coef[0].match(/[\-\+]?\d*/);
            if (isNaN(second_coef[0])) {
                switch (second_coef[0]) {
                    case "-":
                        coef.push(-1);
                        break;
                    case "+":
                        coef.push(1);
                        break;
                }
            }else if(second_coef[0] == ""){
                coef.push(1);
            }else{
                second_coef = parseInt(second_coef[0]);
                coef.push(second_coef);
            }
        }else{
            coef.push(0);
        }

        var third_coef = quadraticEquationString.match(re3);
        if(third_coef != null) {
            third_coef = third_coef[0].replace(/\=/,"");
            if (isNaN(third_coef)) {
                switch (third_coef) {
                    case "-":
                        coef.push(-1);
                        break;
                    case "+":
                        coef.push(1);
                        break;
                }
            }else if(second_coef == ""){
                coef.push(1);
            }else{
                third_coef = parseInt(third_coef);
                coef.push(third_coef);
            }
        }else{
            coef.push(0);
        }

        var result_number = quadraticEquationString.match(re4);
        if(result_number != null) {
            result_number = result_number[0].replace(/\=/,"");
            if (isNaN(result_number)) {
                switch (result_number) {
                    case "-":
                        coef.push(-1);
                        break;
                    case "+":
                        coef.push(1);
                        break;
                }
            }else if(result_number == ""){
                coef.push(1);
            }else{
                result_number = parseInt(result_number);
                coef.push(result_number);
            }
        }else{
            coef.push(0);
        }
        coef[2] -= coef[3];
        coef.pop();
    }
    if(coef){
        console.log("test");
    }
    return coef;
}

function makeGraph(data_obj){
    var ctx = document.getElementById("myChart");
    var data = {
        datasets: [{
            data: data_obj,
            label: 'Dataset',
            fill: false,
            borderColor: "rgba(0,0,0,1)",
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)"
        }]
    };
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            },
            title: {
                display: true,
                text: 'Graph'
            },
            responsive: false
        }
    });
}

function getGraphData(coef){
    var data = []
    max_range = 50;
    for (i=-max_range;i<=max_range;++i){
        data.push({
            x:i,
            y:coef[0]*math.pow(i,2) + coef[1]*i + coef[2]
        })
    }
    return data;
}
function showPrompt() {
    var quadraticEquationString = prompt("Enter your quadratic equation in specified form", "-x^2+3x-2=0");
    var roots = [];
    var coef = [];

    if (quadraticEquationString != null) {
        coef = extract_coef(quadraticEquationString);
        console.log(coef);
        var roots = calcRoots(coef[0], coef[1], coef[2]);
        showSolutionAlert(roots);
        if(roots.length != 0){
            document.getElementById("message2").innerHTML = 'The graph is given below';
            var data = getGraphData(coef);
            makeGraph(data);
        }
    }
}

function showSolutionMessage(roots) {
    switch(roots.length){
        case 0:
            document.getElementById("message1").innerHTML = "You entered an invalid equation\n" + "Try entering another";
            break;
        case 1:
            document.getElementById("message1").innerHTML = "Solution is given below:" + "<br>" + "solution = " + roots[0];
            break;
        case 2:
            document.getElementById("message1").innerHTML = "Solution is given below:" + "<br>" + "solution1 = " + roots[0]
                + "<br>" + "solution2 = " + roots[1];
    }
}

function executeProgram(){
    var quadraticEquationString = document.getElementById("string_equation").value;
    var roots = [];
    var coef = [];

    if (quadraticEquationString != null) {
        coef = extract_coef(quadraticEquationString);
        console.log("coef = " + coef);
        var roots = calcRoots(coef[0], coef[1], coef[2]);
        console.log("solutions = " + roots);
        showSolutionMessage(roots);
        if(roots.length != 0){
            document.getElementById("message2").innerHTML = 'The graph is given below';
            var data = getGraphData(coef);
            makeGraph(data);
        }
    }else{
        document.getElementById("message2").innerHTML = 'You string is invalid, try once more';
    }
}