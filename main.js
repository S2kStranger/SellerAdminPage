var myform=document.getElementById('booking_form');
myform.addEventListener('submit',addData);
var price=document.getElementById("price");
var nam=document.getElementById("name");
var worth=document.getElementById("worth");
let totalamt=parseInt(worth.value,10);

//GET request from crudcrud
axios.get("https://crudcrud.com/api/5c854d13628345e38ba97fcabac51467/SellersAdminPage")
    .then((response) => {
        for(var i=0; i<response.data.length;i++)
        {
            showOnWebpage(response.data[i]);
            totalamt=totalamt+parseInt(response.data[i].productPrice,10);
            worth.value=totalamt;
        }
    })
    .catch((err) => alert("No data available"));

//------------------------------------------

//Adding data at backend
function addData(e)
{
    e.preventDefault();
    const newData=new newProduct(nam.value,price.value);
    axios.post("https://crudcrud.com/api/5c854d13628345e38ba97fcabac51467/SellersAdminPage",newData)
        .then((response) => {
            showOnWebpage(newData);
            totalamt=totalamt+parseInt(newData.productPrice,10);
            worth.value=totalamt;
            price.value='';
            nam.value='';
        })
        .catch((err) => alert(err))
}


    function newProduct(productName,productPrice)
    {
        this.productPrice=productPrice;
        this.productName=productName;
    }

    function showOnWebpage(productObj)
    {
        var str= productObj.productPrice+" - "+productObj.productName+" ";
        //creating li attribute
        var data=document.getElementById("users");
        var li=document.createElement('li');
        li.appendChild(document.createTextNode(str));

        //create delete button
        var btn=document.createElement('button');
        btn.appendChild(document.createTextNode('Delete Product'));
        li.append(btn);
        data.appendChild(li);
        //added delete request
        
        btn.addEventListener('click',(e) =>
        {
        e.preventDefault();
        axios.delete(`https://crudcrud.com/api/5c854d13628345e38ba97fcabac51467/SellersAdminPage/${productObj._id}`)
            .then((response) => {
                totalamt=totalamt-parseInt(productObj.productPrice,10);
            worth.value=totalamt;
            li.remove();
                alert("Successful");
            })
            .catch((err) => alert(err))
            
        });

        

    }