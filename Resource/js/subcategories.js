
$(document).ready(function(){
    // Initialize Materialize components
    $('.collapsible').collapsible();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();

    getAllSubCategories();
    ShowSubCategoriesAndResources();
});

function getSizeOf(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }

    return size;
};

function getAllSubCategories(){
    var action = '__allSubCategories';

    $.post('Controller/SubCategoriesController.php', { Action: action }, function(response) {
        var Data = JSON.parse( response );

        if( Data.Status ){            
            // txtUser = '¡Datos recibidos!';
            // M.toast({html: txtUser, classes: 'rounded green darken-2'});

            localStorage.setItem("SubCategories", JSON.stringify(Data) );
        }else{
            M.toast({html: "¡Error!", classes: 'rounded red'});
        }
    });
}

function ShowSubCategoriesAndResources(){
    var Data_SubCategories = JSON.parse( localStorage.getItem("SubCategories") );
    var num_categories = getSizeOf(Data_SubCategories)-1;
    var items = "", icon = "", counter = 0;

    for(var i=0; i<num_categories; i++){
        var category_number = Data_SubCategories[i].id_categoria;

        if( category_number === '2' )
            icon = "weekend";
        else if( category_number === '3' )
            icon = "memory";
        else if( category_number === '4' )
            icon = "directions_run";
        else if( category_number === '5' )
            icon = "kitchen";
        else if( category_number === '6' )
            icon = "directions_car";
        else if( category_number === '7' )
            icon = "build";
        else
            icon = "assignment";

        items = items + 
                "<li class='collection-item'> "+
                    "<i class='material-icons left'>"+icon+"</i>"+
                    "<div> <strong>"+Data_SubCategories[i].nombre+"</strong><br>"+ Data_SubCategories[i].descripcion +
/*                        "<a class='secondary-content black-text'>"+
                            Data_SubCategories[i].descripcion +
                        "</a> "+*/
                        "<a class='secondary-content option-icons-hide'>"+
                            "<button class='btn-floating btn-small waves-effect red right btn-delete-category'>      <i class='material-icons'>delete</i>   </button>"+
                            "<button class='btn-floating btn-small waves-effect orange right btn-edit-category'>   <i class='material-icons'>edit</i>     </button>"+
                        "</a> "+
                    "</div>"+
                "</li>";
    }

    $('.subcategories-container').append(items);
}

$(document).on('mouseover', '.collection-item', function(){
    $(this).css('background-color', 'rgb(245, 245, 245)');
    $(this).siblings().css('background-color', 'white');
    var options = $(this).children().find('a');

    options.removeClass('option-icons-hide');
    options.addClass('option-icons-show');
});

$(document).on('mouseout', '.collection-item', function(){
    $(this).css('background-color', 'white');
    var options = $(this).children().find('a');

    options.removeClass('option-icons-show');
    options.addClass('option-icons-hide');
});





