import { useEffect, useState } from "react";

export default function Typer() {
    const lines = ["are relevant", "resonate", "matter"];
    const [visible, setVisible] = useState(true);
    const [quoteData, setQuoteData] = useState({
        quote: lines[0],
        index: 0,
        isBackspacing: false,
    });

    useEffect(() => {
        let blink;
        const blinkCursor = () => {
            setVisible((prev) => !prev);
            blink = setTimeout(blinkCursor, 500);
        };
        blink = setTimeout(blinkCursor, 500);

        return () => {
            clearTimeout(blink);
        };
    }, []);

    useEffect(() => {
        let func;
        let breakTime = 100;
        if (quoteData.quote.length === lines[quoteData.index].length) {
            func = () =>
                setQuoteData((prev) => ({
                    ...prev,
                    isBackspacing: true,
                    quote: lines[prev.index].slice(0, prev.quote.length - 1),
                }));
            breakTime = 2000;
        } else if (quoteData.quote.length === 0) {
            func = () => {
                setQuoteData((prev) => ({
                    quote: lines[prev.index < 2 ? prev.index + 1 : 0].slice(
                        0,
                        1,
                    ),
                    index: prev.index < 2 ? prev.index + 1 : 0,
                    isBackspacing: false,
                }));
            };
            breakTime = 1000;
        } else {
            func = () =>
                setQuoteData((prev) => ({
                    ...prev,
                    quote: lines[prev.index].slice(
                        0,
                        prev.isBackspacing
                            ? prev.quote.length - 1
                            : prev.quote.length + 1,
                    ),
                }));
        }
        const timer = setTimeout(func, breakTime);

        return () => {
            clearTimeout(timer);
        };
    }, [quoteData]);

    return (
        <div className="flex flex-row">
            <code className="text-7xl mr-2 text-pink-950">
                {quoteData.quote}
            </code>
            <div
                className={`border-2 w-1 border-gray-400 ${visible ? "" : "invisible"}`}
            ></div>
            <p className="invisible text-7xl">|a</p>
        </div>
    )
}