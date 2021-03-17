const scrape = require('aliexpress-product-scraper');
const socketController=(socket)=>{
        
        
    
        console.log('cliente conectado')
        socket.emit('eventName', 'Mecago en cristo negro')
        socket.on('enviarId', async(payload,callback)=>{

                const product =  scrape  (payload.id);



                
                product
                .then(res => {
                    
                    // console.log('The JSON: ', res);
                    
                    
                    // UTILIZANDO EL MODELO DE DATOS DE MONGOOSE
                    // producScrape = await  new Producto ({
                        //   titulo : res.title 
                        // })
                        // console.log(producScrape)
                        
                        // CREANDO UN OBJETO COMPATIBLE CON EL LISTADO DE EXCEL
                     producScrape = {
                            "Action(SiteID=Spain|Country=ES|Currency=EUR|Version=745)": "add",
                            "ItemID": "4",
                            "CustomLabel":res.productId,
                            "Category": res.categoryId,
                            "StoreCategory":'',
                            "Title":res.title,
                            "ConditionID":'1000',
                            "Marca":res.Marca,
                            "MPN":'No aplicable',
                            "Product":'No aplicable',
                            "EAN":'',
                            "PicURL": res.images,
                            "Description":res.description,
                            "Format":'Fixed Price',
                            "Duration":'GTC',
                            "StartPrice":[ res.originalPrice.max  ,  res.originalPrice.min],
                            "Quantity":'',
                            "Location": '15179',
                            "ShippingProfileName":'Fija:Correos: carta(Gratis),3 días laborables',
                            "ReturnProfileName": 'Devoluciones aceptadas,Comprador,14 días#0',
                            "PaymentProfileName":'PayPal:Pago inmediato',
                            "Relationship":'',
                            "RelationshipDetails":'',
                            "Variantes": res.variants.options[0].values,
                            "Precios":[]
                        }
                        const precioss = res.variants.prices.values()
                        var variantes = producScrape.Variantes
                        
                        
                        
                        
                        for (const precio of precioss ){
                            console.log(precio)
                            for (const variante of variantes){
                                if(precio.optionValueIds == variante.id){
                                    Object.assign(precio,variante)
                                    producScrape.Precios.push(precio)
                                }
                            }         
                        }
                        console.log(producScrape)
                        callback(producScrape)
                    })
                    .catch(e=>{
                        console.log(e);
                    })
                    
                      //  console.log (producScrape)
                        
                })
                
                // })
        }


        





module.exports = {socketController}