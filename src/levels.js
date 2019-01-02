
 function buildLevel(game, level)
{
    let bricks=[];

    level.forEach((row,rowIndex)=> {

        row.forEach((brick,brickIndex) =>{

            if(brick===1)
            {
                let postion ={
                   
                    x: 80*brickIndex ,
                    y: 75+24*rowIndex
                };
              bricks.push(new Brick (game,postion))
            }
        }
        );
    });

return bricks;
}


const level1=[

    [0,1,1,0,0,0,0,1,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];