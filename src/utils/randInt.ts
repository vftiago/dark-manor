const randInt = (min: number = 0, max: number):number => Math.floor(Math.random() * (max - min +1) ) + min;

export default randInt;