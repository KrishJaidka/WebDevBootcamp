        var counter = document.querySelector('#counter')
        const plus = () => {
            counter.value = parseInt(counter.value)+1
            console.log(parseInt(counter.value)+1);
        };

        const minus = () => {
            counter.value  = parseInt(counter.value)-1
            console.log(parseInt(counter.value)-1);
        }