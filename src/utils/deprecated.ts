export function deprecated(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
        console.warn(`A função ${key} está obsoleta. Favor utilizar uma alternativa.`);

        return await originalMethod.apply(this, args);
    };

    return descriptor;
}