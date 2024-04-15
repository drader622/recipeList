export class Recipe {
    constructor(public title: string,
        public description: string,
        public difficulty: string,
        public cookTime: string,
        public daysGood: number,
        public imageUrl: string,
    ) {}
}
