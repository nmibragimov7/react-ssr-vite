interface IClass {
    [key: string]: boolean | string
}

type Args = Array<IClass | string>

export const classes = (...args: Args) => {

    return args.reduce<string[]>((cls, classes) => {
        if (typeof classes === 'string') {
            cls.push(classes)
        } else if (!!classes) {
            const validCLs = Object.keys(classes).filter(clsKey => classes[clsKey])
            cls.push(validCLs.join(" "))
        }
        return cls
    }, []).join(" ")
}
