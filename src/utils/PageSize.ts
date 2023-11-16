export default function PageSizeFunc(total: number) {
    const pageSize = Math.ceil(total / 10)
    return pageSize
}