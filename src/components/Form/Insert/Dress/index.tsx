import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useMutation } from "react-query";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import Input from "../../Input";
import Select from "../../Select";
import styles from "./styles.module.scss";

interface CreateDressFormData {
    image: File,
    name: string;
    value: Number;
    category: string;
}

interface FormDressProps {
    categorys: CategoryDress[],
}


export default function FormDress({ categorys }: FormDressProps) {
    const [fileName, useFileName] = useState("");
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const createDresss = useMutation(async (dress: CreateDressFormData) => {
        const response = await api.post('/dress', {
            ...dress,

        })
        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('dress');
        }
    })


    // const createDresssImage = useMutation(async (dress: CreateDressFormData ) => {
    //     const response = await api.post(`dress/images/${dress.id}`, {
    //         ...dress,

    //     })
    //     return response;
    // }, {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('dress');
    //     }
    // })


    async function onInsertNewDress(e: FormEvent) {
        e.preventDefault();
        const dress = {
            name: e.target.name.value,
            category_id: e.target.category.value,
            price: e.target.value.value
        }
        await createDresss.mutateAsync(dress);

    }


    function OpenChoosenFile() {
        hiddenFileInput?.current?.click();

    }

    function OnChooseImage(event: ChangeEvent) {
        const target = event.target as HTMLInputElement;
        let fileUploaded = '';

        if (target.files && target.files.length) {
            fileUploaded = target.files[0].name;
        }
        useFileName(fileUploaded);

    }

    return (
        <>
            <div className={`${styles.container}`}>
                <form onSubmit={onInsertNewDress} method="post">
                    <div className={`${styles.inputImage}`}>
                        <a onClick={OpenChoosenFile}>
                            <label> Imagem </label>
                            <FontAwesomeIcon icon={faPlus} />
                            <input type="file" className="hidden" name="image" onChange={OnChooseImage} ref={hiddenFileInput} />
                            <p> Atual: {fileName} </p>
                        </a>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Select options={categorys} name={"category"} text={"Categoria"} />
                        </div>
                    </div>
                    <div className={`${styles.containerInputs}`}>
                        <div>
                            <Input name="name" text="Nome" type="text" style="orange" />
                        </div>
                        <div>
                            <Input name="value" text="Valor" type="number" style="orange" />
                        </div>


                    </div>

                    <button className={`${styles.insertNew}`}>Cadastrar</button>
                </form>
            </div>

        </>
    )
} 