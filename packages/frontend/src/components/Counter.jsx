import { useAppDispatch, useAppSelector } from "../app/hooks"
import { incremented, amountAdded } from "../features/counters/counterSlice"
export const Counter = () => {
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        // dispatch(incremented())
        dispatch(amountAdded(3))
    }

    return (
        <div className="flex justify-between w-full px-5 py-2 bg-gray-700">
            <h4 className="w-full text-xl text-left uppercase">{count}</h4>
            <div className="flex items-center justify-end w-full text-right">
                <button  className="px-2 py-1 bg-gray-600 rounded-md" onClick={handleClick}>+</button>
                <button  className="px-2 py-1 bg-gray-600 rounded-md">-</button>
            </div>
        </div>
    )
}