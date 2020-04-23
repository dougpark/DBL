class Colors {
    /*
    
   
    #B6D9C0
    #A8B1A7
    #EBE4E9
    #B76255

    #61892f
    #86c232
    #222629
    #474b4f
    #6b6e70
   
    #DCDCDA
    #E7E7E5
    #FCFCFC
    #3F3F3F


    */
    constructor() {
        this.root = document.documentElement;
        this.currentColor = 0;
        this.colors = [{
                'bg': '#58A4B0',
                'bg2': '#373F51',
                'bg3': '#5D6772',
                'text': '#1B1B1E',
                'text2': '#D8DBE2'
            }, {
                'bg': '#3F3F3F',
                'bg2': '#474b4f',
                'bg3': '#6b6e70',
                'text': '#E7E7E5',
                'text2': '#DCDCDA'
            }, {
                'bg': '#FCFCFC',
                'bg2': '#3F3F3F',
                'bg3': '#6b6e70',
                'text': '#3F3F3F',
                'text2': '#DCDCDA'
            }, {
                'bg': '#86c232',
                'bg2': '#474b4f',
                'bg3': '#61892f',
                'text': '#222629',
                'text2': '#D8DBE2'
            }, {
                'bg': '#B6D9C0',
                'bg2': '#373F51',
                'bg3': '#B76255',
                'text': '#1B1B1E',
                'text2': '#D8DBE2'
            }, {
                'bg': '#cb8d2e',
                'bg2': '#323232',
                'bg3': '#222222',
                'text': '#000000',
                'text2': '#d3d3d3'
            },
            {
                'bg': '#3C91E6',
                'bg2': '#342E37',
                'bg3': '#FA824C',
                'text': '#FAFFFD',
                'text2': '#FAFFFD'
            }
        ];
    }
    setColor(color) {
        this.currentColor = color;
        this.root.style.setProperty('--main-bg-color', this.colors[color].bg);
        this.root.style.setProperty('--main-bg2-color', this.colors[color].bg2);
        this.root.style.setProperty('--main-bg3-color', this.colors[color].bg3);
        this.root.style.setProperty('--main-text-color', this.colors[color].text);
        this.root.style.setProperty('--main-text2-color', this.colors[color].text2);
        preferences.defaultColor = color;
        dsPref.save(preferences);
    }
    changeColor(direction) {
        this.currentColor += direction;
        if (this.currentColor < 0)
            this.currentColor = 0;
        if (this.currentColor > this.colors.length - 1)
            this.currentColor = this.colors.length - 1;
        this.setColor(this.currentColor);
    }
}
//# sourceMappingURL=Colors.js.map