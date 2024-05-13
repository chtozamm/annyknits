"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectTheme,
  setThemeState,
} from "@/lib/redux/features/theme/themeSlice";
import {
  addCounter,
  deleteCounter,
  selectCounters,
  selectCurrentCounter,
  updateCounter,
} from "@/lib/redux/features/counters/countersSlice";

const colors = [
  "red",
  "sky",
  "rose",
  "orange",
  "mint",
  "lavender",
  "indigo",
  "cyan",
];
const icons = [
  "🧶",
  "🧣",
  "👚",
  "🤍",
  "🎨",
  "🎂",
  "🍰",
  "🍵",
  "✨",
  "🪄",
  "🦊",
  "🐺",
  "🦉",
  "🐈",
  "🌲",
  "⚡",
];

export default function Settings() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const currentCounter = useAppSelector(selectCurrentCounter);
  const counters = useAppSelector(selectCounters);
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    theme &&
      dispatch(
        updateCounter({
          counter: { ...counters[currentCounter!], theme: theme },
          id: currentCounter!,
        }),
      );
  }, [theme]);
  return (
    <>
      <footer className="absolute bottom-6 left-0 z-20 w-full px-4">
        <div
          className={`flex w-full items-center justify-evenly rounded-xl bg-opacity-10 ${isOpen ? "bg-white" : "bg-black"} font-mono text-white`}
        >
          <button
            className={`${isOpen ? "opacity-50" : "opacity-100"} p-2`}
            onClick={() => {
              setShowDialog(false);
              setIsOpen(false);
            }}
          >
            123
          </button>
          <span className="h-4 border-r border-white opacity-20" />
          <button
            onClick={() => {
              setShowDialog(false);
              setIsOpen(true);
            }}
            className={`${isOpen ? "opacity-100" : "opacity-50"} p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
              />
            </svg>
          </button>
        </div>
      </footer>
      {isOpen && (
        <div className="absolute z-10 flex h-screen w-screen flex-col items-center overflow-y-scroll bg-black p-8 pb-20 text-white">
          <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-md">
            <label className="select-none text-center text-xs font-semibold uppercase">
              Customization
            </label>
            <section className="flex flex-col gap-2">
              <label
                htmlFor="label"
                className="select-none text-xs font-semibold uppercase"
              >
                Label
              </label>
              <input
                type="text"
                name="label"
                id="label"
                value={counters[currentCounter!]?.name}
                onChange={(e) =>
                  dispatch(
                    updateCounter({
                      counter: {
                        ...counters[currentCounter!],
                        name: e.target.value,
                      },
                      id: currentCounter!,
                    }),
                  )
                }
                className="rounded-md bg-zinc-900 px-2.5 py-1 outline-none focus-within:bg-zinc-700"
              />
            </section>
            <section className="flex flex-col gap-2">
              <label
                htmlFor="value"
                className="select-none text-xs font-semibold uppercase"
              >
                Value
              </label>
              <input
                type="text"
                name="value"
                id="value"
                value={counters[currentCounter!]?.value}
                onChange={(e) =>
                  dispatch(
                    updateCounter({
                      counter: {
                        ...counters[currentCounter!],
                        value: +e.target.value > 0 ? +e.target.value : 0,
                      },
                      id: currentCounter!,
                    }),
                  )
                }
                className="rounded-md bg-zinc-900 px-2.5 py-1 outline-none focus-within:bg-zinc-700"
              />
            </section>
            <section className="flex flex-col gap-4">
              <label className="select-none text-xs font-semibold uppercase">
                Theme color
              </label>
              <ul className="flex select-none flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      dispatch(setThemeState(color));
                    }}
                    className={`h-6 w-6 rounded-full border-2 border-white ${theme === color ? "opacity-100" : "opacity-50"} bg-${color}-primary`}
                  />
                ))}
              </ul>
            </section>
            <section className="flex flex-col gap-4">
              <label className="select-none text-xs font-semibold uppercase">
                Icon
              </label>
              <ul className="flex select-none flex-wrap gap-4">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => {
                      dispatch(
                        updateCounter({
                          counter: { ...counters[currentCounter!], icon: icon },
                          id: currentCounter!,
                        }),
                      );
                    }}
                    className={`h-6 w-6 text-2xl ${counters[currentCounter!].icon === icon ? "opacity-100" : "opacity-50"}`}
                  >
                    {icon}
                  </button>
                ))}
              </ul>
            </section>
            <section className="flex flex-col gap-4">
              <button
                className="mx-auto mt-8 w-fit select-none px-2 py-1.5 text-xs uppercase"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </button>
              <button
                className="mx-auto w-fit select-none px-2 py-1.5 text-xs uppercase text-red-700"
                onClick={() => setShowDialog(true)}
              >
                Delete counter
              </button>
              {showDialog && (
                <div className="absolute left-0 top-0 z-30 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-black px-4 text-center">
                  <label className="select-none">
                    Are you sure you want to delete the counter?
                  </label>
                  <div className="flex gap-8">
                    <button
                      onClick={() => {
                        if (counters.length === 1) {
                          dispatch(
                            addCounter({
                              name: "New counter",
                              value: 0,
                              theme: "indigo",
                              icon: "🧶",
                            }),
                          );
                          dispatch(setThemeState("indigo"));
                        }
                        dispatch(deleteCounter(currentCounter!));
                        setShowDialog(false);
                        setIsOpen(false);
                      }}
                      className="select-none text-xs font-semibold uppercase text-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setShowDialog(false)}
                      className="select-none text-xs uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}
