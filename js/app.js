async function loadTrainingData() {

    const container =
        document.getElementById("training-list");

    const { data, error } =
        await supabaseClient
        .from("trainingdata")
        .select("*")
        .order("id");

    if(error){

        container.innerHTML=`
            <div class="card">
                <h3>Error</h3>
                <p>${error.message}</p>
            </div>
        `;

        return;
    }

    container.innerHTML="";

    data.forEach(item=>{

        container.innerHTML+=`

        <div class="card">

            <h3>${item.title}</h3>

            <p>${item.desc ?? ""}</p>

            <div class="tech">

                ${item.tech ?? ""}

            </div>

            <br>

            <a class="btn"
               href="${item.link}"
               target="_blank">

                Open Training

            </a>

        </div>

        `;

    });

}

loadTrainingData();
