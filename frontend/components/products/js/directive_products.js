getyourcar.directive('productArticle', function() {
    return {templateUrl: 'frontend/components/products/template/template_products.html',
            scope: {image: '@',
                    brand: '@',
                    model: '@',
                    carplate: '@'},
            };
});