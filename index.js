;$(document).ready(($) =>{
    let depth = 20;
    const init = () => {
        let type = 'random',
            interval,
            start = false;

        draw(type);

        $('.button-success').off().click(() => {
            if(start) {
                this.textContent = "Start";
                clearInterval(interval);
                start = false
            }
            else {
                this.textContent = "Stop";
                start = true;
                let $casillas = $('.casilla');
                interval = setInterval(() => {
                    $casillas.map((i, casilla) => {            
                        return neighbors(casilla.id)
                            .map(countAlives)
                            .reduce((x,y) => x + y);
                    })
                    .map((i, alives) => {                        
                        if(alives < 2 || alives > 3) {
                            $($('.casilla')[i]).removeClass('alive');
                        } else if (alives === 3) {
                            $($('.casilla')[i]).addClass('alive');                    
                        }
                    });
                }, 385);
            }
        });

        $('.button-random').off().click(() => {
            type = 'random';
            draw(type);
        });


        $('.button-grid').off().click(() => {
            type = 'grid';
            draw(type);
        });

        $('.button-reset').off().click(() => {
            if (start) $('.button-success').click();
            draw(type);
        });
    }

    const countAlives = casilla => {
        if (typeof casilla !== 'undefined')
            return $('#' + casilla).hasClass('alive') ? 1 : 0;
        return 0;
    };

    const neighbors = id => {
        const actual = id.split('-');
        const coords = [[-1,-1], [-1,0], [-1,1],
                        [0,-1],          [0,1],
                        [1,-1], [1,0], [1,1] ];
        return coords.map(x => {
            const newR = x[0] + parseInt(actual[0]);
            const newC = x[1] + parseInt(actual[1]);
            if ((newR >= 0 && newC >= 0) && (newR < depth && newC < depth)) 
                return newR + "-" + newC;
        });
    };

    const draw = type => {
        let isAlive = (type === 'random') ? Math.round(Math.random()) : true,
            newDivIn,
            newDivOut;
        depth = parseInt($('#depth').val()) || depth;
        $('#contenedor').html('');
        for (let i = 0; i < depth; i+=1){
            newDivOut = $('<div id="row" class="fila"/>');
            for(let j = 0; j < depth; j+=1){
                newDivIn = $('<div id='+ i + '-' + j +' class="casilla"/>');
                newDivIn.addClass(isAlive ? 'alive' : '');
                isAlive = (type === 'random') ? Math.round(Math.random()) : !isAlive;
                newDivOut.append(newDivIn);
                
            }
            if (type === 'grid' && depth % 2 === 0) isAlive = !isAlive;
            $('#contenedor').append(newDivOut);
        }
    };

    init();


}(jQuery));