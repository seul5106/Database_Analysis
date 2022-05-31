for(var i = 1; i <= 6; i++){            //반복 횟수 : 6번
    // console.log(i)
    for(var j = 1; j <= 6; j++){        //반복 횟수 : 6번
        // console.log(j);                 //반복 횟수 : 36번
        if(i + j == 5){
            console.log(i, j);
        }
    }
}