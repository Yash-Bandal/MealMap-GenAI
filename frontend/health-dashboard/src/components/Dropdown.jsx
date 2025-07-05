import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

const Dropdown = ({ label, options, value, onChange }) => {
    return (
        <div className="w-full">
            <Listbox value={value} onChange={onChange}>
                {({ open }) => (
                    <div className="relative mt-1">
                        <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {label}
                        </Listbox.Label>
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-[#0c0d0f] border border-gray-300 dark:border-gray-700 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
                            <span className="block truncate text-gray-800 dark:text-gray-100">{value || 'Select'}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        {/* <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition-all duration-200 ease-in-out"> */}
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#0c0d0f] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition-all duration-200 ease-in-out">
                            {options.map((opt, idx) => (
                                <Listbox.Option
                                    key={idx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors duration-150 ease-in-out ${active ? 'bg-purple-100 dark:bg-blue-500 text-purple-900 dark:text-white' : 'text-gray-900 dark:text-gray-100'
                                        }`
                                    }
                                    value={opt}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {opt}
                                            </span>
                                            {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600 dark:text-purple-300">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                )}
            </Listbox>
        </div>
    )
}

export default Dropdown