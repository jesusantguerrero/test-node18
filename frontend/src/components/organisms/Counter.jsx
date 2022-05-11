import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { incremented } from "../../features/counters/counterSlice"
export const Counter = () => {
    const count = useAppSelector(state => state.counter.value)

    return (
        <div className="flex justify-between w-full px-5 py-2 bg-gray-700">
            <h4 className="w-full text-xl text-left uppercase">{count}</h4>
            <div className="flex items-center justify-end w-full text-right">
                <button  className="px-2 py-1 bg-gray-600 rounded-md">+</button>
                <button  className="px-2 py-1 bg-gray-600 rounded-md">-</button>
            </div>
        </div>
    )
}