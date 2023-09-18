"use client";

import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { useCompletion } from "ai/react";
import initialOptions from "@/utils/ctes";

const OptionList = ({ options, onSelect, index }) => {
  const [expanded, setExpanded] = useState(false);

  const OPTION_LIMIT = 12;

  return (
    <>
      {options
        .slice(0, !expanded ? OPTION_LIMIT : options.length)
        .map((sub, i) => (
          <button
            key={i}
            onClick={() => onSelect(sub, index)}
            className={`border-2 ${
              sub.selected
                ? "bg-neutral-200 text-neutral-800 border-black"
                : "text-black hover:border-neutral-800 border-neutral-400 "
            } text-sm active:bg-white active:border-white active:text-neutral-800  font-medium transition-all px-4 py-1.5 rounded-md`}
          >
            {sub.label}
          </button>
        ))}
      {options.length > OPTION_LIMIT && (
        <div
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center"
        >
          <div className="text-neutral-400 hover:text-black text-sm cursor-pointer mt-2 flex items-center transition-all">
            <div>{expanded ? "Hide options" : "Show more"}</div>
            <div className="text-2xl">
              {expanded ? (
                <div className="mt-1">
                  <BiChevronUp />
                </div>
              ) : (
                <BiChevronDown />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function Home() {
  const {
    setInput,
    isLoading,
    completion,
    handleSubmit,
    stop,
    setCompletion,
    input,
  } = useCompletion({
    onFinish: () => {
      // do something with the completion result
      //toast.success('Successfully generated completion!')
      // console.log("termino");
    },
  });

  const [options, setOptions] = useState(initialOptions);

  const [language, setLanguage] = useState("English");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // Esta funcion sirve para manejar los true/false de cada opcion => logras que se marquen y desmarquen, esto manipula el arreglo de objetos de opciones

  const handleSelect = (option, index) => {
    const newOptions = [...options];
    newOptions[index].options = newOptions[index].options.map((item) => {
      if (item.value === option.value) {
        item.selected = !item.selected;
      }
      return item;
    });
    setOptions(newOptions);
  };

  // esta funcion es para agarrar los seleccionados y ponerlos en el input para buscar en gpt

  const getSelectedOptions = () => {
    const selectedOptions = options
      .map((option) => {
        //aca esta toda la opcion completa 1 x 1 con name, desc y opciones
        return {
          name: option.name,
          options: option.options
            .filter((item) => item.selected) // aca pasa por las opciones, los items de cada opcion que damos => la seleccionada que esta en true es la que nos quedamos
            .map((item) => item.value) // en este quedaron solo los seleccionados entonces a los seleccionados les retornamos el "value" que lo almacenaremos en el objeto como 'options
            .join(", "),
        };
      })
      .map((option) => {
        // aca entran con el name y la opcion que seria el value, si no fue seleccionado el option (value) queda en '' (nada). es decir, el obj del return anterior
        if (option.options.length > 0) {
          // => con esto lo filtra y toman los seleccionados
          return option;
        }
      })
      .filter((option) => option !== undefined); // termina de limpiar los undefined y qse queda con lo final que lo guarda en "selectedOptions"

    setInput({ selectedOptions, language, height, weight });

    return selectedOptions;
  };

  // esta funcion es para manejar el volver para atras
  const handleGoBack = () => {
    if (isLoading) {
      stop();
    }
    setCompletion("");
  };

  // function that conver [b] to <b> and [/b] to </b>
  // const convertBBCode = (text) => {
   // const bbcode = text.replace(/\[b\]/g, "<b class='text-white text-lg font-bold'>").replace(/\[\/b\]/g, "</b>");
  //   const bbcode = text.replaceAll("<h1>", "<h1 className='text-blue-600'>");
  //   return bbcode;
  // };

  //   useEffect(() => {
  // console.log(completion, 'soy completion')
  //   }, [completion])

  return (
    <div className="bg-white w-screen">
      <div className="absolute top-0 right-0 p-4">
        <div className="text-black/80 hover:text-black">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeJ89O0MatB3orbd6mct-S4W3Uyeos677ZxHNoWtdtvSiZtgw/viewform?usp=sf_link" target="_blank">
            send feedback
          </a>
        </div>
      </div>
      {!completion && (
        <div className="max-w-[720px] min-h-screen mx-auto space-y-6">
          <div className="pt-24 pb-4 px-4">
            <div className="text-black text-4xl md:text-5xl text-center font-semibold">
              HealthFood AI
            </div>
            <div className="text-center text-black my-2">Created by</div>
            <div className="flex justify-center my-2">
              <a
                className="text-sky-500 border-sky-500 hover:text-white hover:bg-sky-500 flex items-center space-x-2 border rounded-full px-4 py-1 text-sm"
                href="https://twitter.com/MolfinoJuani"
                target="_blank"
              >
                <div></div>
                <div className="flex items-center space-x-1">
                  <span>
                    {" "}
                    <BsTwitter />
                  </span>{" "}
                  <span>@juanimolfino</span>
                </div>
              </a>
            </div>
            {/* <div className="flex justify-center mt-12">
              <a
                href="https://www.producthunt.com/posts/business-idea-generator-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-business&#0045;idea&#0045;generator&#0045;ai"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=385986&theme=dark"
                  alt="Business&#0032;Idea&#0032;Generator&#0032;AI - Generate&#0032;business&#0032;ideas&#0032;with&#0032;artificial&#0032;intelligence | Product Hunt"
                  style={{ width: "250px", height: "54px" }}
                  width="250"
                  height="54"
                />
              </a>
            </div> */}
            <div className="text-black text-xl mt-10 font-semibold">
              Before we begin, tell us something about yourself...
            </div>
          </div>

          <div className="px-4">
            <div className="text-black font-semibold text-xl">
              Height & Weight
            </div>
            <div className="text-neutral-600 font-light">
              Tell us your weight and height to recommend a good diet for this
              day
            </div>
            <div className="grid-cols-1 sm:grid-cols-2 grid mt-4 gap-2">
              <div className="flex gap-2 m-0 items-center">
                <input
                  className="rounded-sm w-2/4 focus:outline-none px-2 py-1 text-black"
                  type="number"
                  placeholder="Height"
                  onChange={(e) => setHeight(e.target.value)}
                  value={height}
                  max={250}
                  min={0}
                ></input>
                <p className="text-black font-light text-md">cm</p>
              </div>
              <div className="flex gap-2 m-0 items-center">
                <input
                  className="rounded-sm w-2/4 focus:outline-none px-2 py-1"
                  type="number"
                  placeholder="Weight"
                  onChange={(e) => setWeight(e.target.value)}
                  value={weight}
                  max={400}
                  min={0}
                ></input>
                <p className="text-black font-light text-md">kg</p>
              </div>
            </div>
          </div>

          {options.map((option, index) => (
            <div key={index}>
              <div className="space-y-4 px-4">
                <div>
                  <div className="text-black font-semibold text-xl">
                    {option.name}
                  </div>
                  <div className="text-neutral-600 font-light">
                    {option.description}
                  </div>
                </div>
                <div className="gap-2 flex items-start flex-wrap">
                  {/* List of business models */}
                  {/* order by value string, first a, last z */}
                  {/* {
                    option.options
                      .slice(0, 15)
                      .map((sub: any, _: number) => <button onClick={() => handleSelect(sub, index)} className={`border-2 ${sub.selected ? "bg-white text-neutral-800 border-white" : "text-white hover:border-neutral-200 border-neutral-400 "} text-sm active:bg-white active:border-white active:text-neutral-800  font-medium transition-all px-4 py-1.5 rounded-md`}>{sub.label}</button>)
                  } */}
                  <OptionList
                    options={option?.options}
                    onSelect={(option) => handleSelect(option, index)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="space-y-4 px-4">
            <div>
              <div className="text-black font-semibold text-xl">
                Response Language
              </div>
              <div className="text-neutral-800 font-light">
                Select the language of the response
              </div>
            </div>
            <div className="gap-2 flex items-start flex-wrap">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className={`border-2 w-full bg-white h-11 text-black cursor-pointer hover:border-neutral-600 border-neutral-600 text-sm  font-medium transition-all px-4 py-1.5 rounded-md`}
                name=""
                id=""
              >
                <option value="English">🇺🇸 English</option>
                <option value="Spanish">🇪🇸 Spanish</option>
                <option value="French">🇫🇷 French</option>
                <option value="German">🇩🇪 German</option>
                <option value="Italian">🇮🇹 Italian</option>
                <option value="Portuguese">🇵🇹 Portuguese</option>
                <option value="Russian">🇷🇺 Russian</option>
                <option value="Japanese">🇯🇵 Japanese</option>
                <option value="Chinese">🇨🇳 Chinese</option>
                <option value="Korean">🇰🇷 Korean</option>
                <option value="Arabic">🇸🇦 Arabic</option>
                <option value="Hindi">🇮🇳 Hindi</option>
                <option value="Turkish">🇹🇷 Turkish</option>
                <option value="Dutch">🇳🇱 Dutch</option>
                <option value="Swedish">🇸🇪 Swedish</option>
                <option value="Norwegian">🇳🇴 Norwegian</option>
                <option value="Danish">🇩🇰 Danish</option>
                <option value="Finnish">🇫🇮 Finnish</option>
                <option value="Polish">🇵🇱 Polish</option>
                <option value="Romanian">🇷🇴 Romanian</option>
                <option value="Czech">🇨🇿 Czech</option>
                <option value="Hungarian">🇭🇺 Hungarian</option>
                <option value="Greek">🇬🇷 Greek</option>
                <option value="Bulgarian">🇧🇬 Bulgarian</option>
                <option value="Ukrainian">🇺🇦 Ukrainian</option>
                <option value="Hebrew">🇮🇱 Hebrew</option>
                <option value="Indonesian">🇮🇩 Indonesian</option>
                <option value="Malay">🇲🇾 Malay</option>
                <option value="Thai">🇹🇭 Thai</option>
                <option value="Vietnamese">🇻🇳 Vietnamese</option>
                <option value="Tagalog">🇵🇭 Tagalog</option>
                <option value="Filipino">🇵🇭 Filipino</option>
                <option value="Urdu">🇵🇰 Urdu</option>
                <option value="Bengali">🇧🇩 Bengali</option>
              </select>
            </div>
          </div>

          <div className="sticky bottom-0 px-4 pb-4 pt-2 bg-gradient-to-t from-white via-white to-transparent w-full max-w-[720px]">
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                // disabled={isLoading}
                //onClick={() => streamResponse()}
                onClick={() => getSelectedOptions()}
                className={`disabled:bg-neutral-300 submit-shadow  bg-multi-color  w-full font-semibold transition-all px-4 py-2.5 rounded-md text-white`}
              >
                Generate dish ideas!
              </button>
            </form>
          </div>
        </div>
      )}
      {completion && (
        <div className="bg-white w-screen my-16">
          <div className="max-w-[720px] text-black mx-auto space-y-6">
            <div className="px-4 flex">
              <div
                className="flex items-center text-neutral-900 hover:text-neutral-400 cursor-pointer"
                onClick={() => handleGoBack()}
              >
                <div className="text-2xl">
                  <BiChevronLeft />
                </div>{" "}
                <div>Back to diet food AI Generator</div>
              </div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-semibold mb-4 text-center">
                Dish ideas
              </div>
              <div
                className="text-neutral-950 font-extralight whitespace-pre-line completion"
                dangerouslySetInnerHTML={{
                  __html: 
                  //convertBBCode(completion),
                  completion,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
