
/*
 * Copyright (c) 2008-2011 Hasso Plattner Institute
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

import { Global } from 'minibase';
import { cop, Layer, LayerableObject } from 'Layers.js';

// COP Example from: Hirschfeld, Costanza, Nierstrasz. 2008.
// Context-oriented Programming. JOT)
var copExample = function() {

var AddressLayer = cop.create("AddressLayer");
var EmploymentLayer = cop.create("EmploymentLayer");

if (!cop.example) cop.example = {};
cop.example.Person = Object.subclass('cop.example.Person', {

    initialize: function(newName, newAddress, newEmployer) {
        this.name = newName;
        this.address = newAddress;
        this.employer = newEmployer;
    },

    print: function() {
        return "Name: " + this.name;
    },

    AddressLayer$print: function() {
        return cop.proceed() + "; Address: " + this.address;
    },

    EmploymentLayer$print: function() {
        return cop.proceed() + "; [Employer] " + this.employer.print();
    },

    toString: function() {
        return "Person: " + this.name;
    }

});


cop.example.Employer = Object.subclass('cop.example.Employer', {

    initialize: function(newName, newAddress) {
        this.name = newName;
        this.address = newAddress;
    },

    print: function() {
        return "Name: " + this.name;
    },

    toString: function() {
        return "Employer: " + this.name;
    },
});

AddressLayer.refineClass(cop.example.Employer, {
    print: function() {
        return cop.proceed() + "; Address: " + this.address;
    },
});

};

var DummyLayer = cop.create("DummyLayer");
var DummyLayer2 = cop.create("DummyLayer2");
var DummyLayer3 = cop.create("DummyLayer3");


if (!cop.example) cop.example = {};
cop.example.DummyClass = Object.subclass('cop.example.DummyClass', {
    initialize: function() {
        this.e = "Hello";
        this.m = "Hello";
        this.execution = []
    },
    f: function(a, b) {
        this.execution.push("d.f");
        // console.log("execute default f(" + a, ", " + b + ")");
        return 0;
    },
    DummyLayer$f: function(a, n) {
        this.execution.push("ld.f");
        //console.log("execute dummy layer f(" + a, ", " + b + ")");
        return cop.proceed() + 100;
    },

    DummyLayer2$f: function(a, n) {
        this.execution.push("ld2.f");
        return cop.proceed() + 1000;
    },

    get DummyLayer$e() {
        return this._DummyLayer_e;
    },
    set DummyLayer$e(v) {
        this._DummyLayer_e = v;
    },
    get DummyLayer$m() {
        return cop.proceed() + " World";
    },
    h: function() {
        // console.log("h");
        return 2;
    },
    DummyLayer$h: function() {
        // console.log("D$h old(" + cop.proceed() +")");
        return 3;
    },
    DummyLayer3$h: function() {
        // console.log("D3$h old(" + cop.proceed() +")");
        return 4;
    },

    DummyLayer$newMethod: function() {
        return "totally new"
    },

    m1: function() {
        return 1;
    },

    DummyLayer$m1: function() {
        return 7;
    },


    m2: function() {
        return "m2";
    },

    DummyLayer$m2: function() {
        return "D$m2," + cop.proceed();
    },


    fooo: function() {
        return "base";
    },

    DummyLayer$newFoo: function() {
        return "newFoo";
    },

    say: function(a) {
        return "Say: " + a
    },
});


cop.example.DummySubclass = cop.example.DummyClass.subclass('cop.example.DummySubclass', {

    f2: function() {
        return 3;
    },

    DummyLayer$f2: function() {
        return 4;
    },

    m1: function() {
        return 10;
    },

    DummyLayer$m1: function() {
        return cop.proceed() + 1;
    },

    DummyLayer$fooo: function() {
        var proc =  cop.proceed();
        return proc+"-layer-"+this.newFoo();
    },

    toString: function() {
        return "[a DummySubclass]"
    },

    m2: function() {
        return "S$m2"
    }

});

cop.example.SecondDummySubclass = cop.example.DummyClass.subclass('cop.example.SecondDummySubclass', {

    DummyLayer$m1: function() {
        return cop.proceed() + 100;
    },

});


var assert = chai.assert;

describe('COP example', function () {

    it('changes behavior depending on activated Layers in dynamic scope', function() {
        copExample();

        var name = "Hans Peter",
            address = "Am Kiez 49, 123 Berlin",
            employer_name = "Doener AG",
            employer_address = "An der Ecke, 124 Berlin",
            employer = new cop.example.Employer(employer_name, employer_address),
            person = new cop.example.Person(name, address, employer);

        assert.equal(person.print(), "Name: " + name, "toString without a layer is broken");

        cop.withLayers([Global.AddressLayer], function() {
            assert.equal(person.print(), "Name: " + name + "; Address: " + address, "toString with address layer is broken");
        }.bind(this));

        cop.withLayers([Global.EmploymentLayer], function() {
            assert.equal(person.print(), "Name: " + name + "; [Employer] Name: " + employer_name, "toString with employment layer is broken");
        }.bind(this));

        cop.withLayers([Global.AddressLayer, Global.EmploymentLayer], function() {
            assert.equal(person.print(), "Name: " + name +  "; Address: " + address +
                "; [Employer] Name: " + employer_name + "; Address: " + employer_address,
                "toString with employment layer is broken");
        }.bind(this));
    });

});

var currentTest = undefined;

describe('cop', function () {

    beforeEach(function() {
        this.execution  = [];
        Global.currentTest = this;
        this.oldGlobalLayers = cop.GlobalLayers;
        cop.GlobalLayers = []; // ok, when we are testing layers, there should be no other layers active in the system (to make things easier)
        cop.resetLayerStack();
    });

    afterEach(function() {
        cop.GlobalLayers = this.oldGlobalLayers;
        cop.resetLayerStack();
    });

    var object1;
    var makeObject1 = function() {
        object1 = {
            myString: "I am an object",
            f: function(a, b) {
                Global.currentTest.execution.push("d.f");
                // console.log("execute default f(" + a, ", " + b + ")");
                return 0;
            },
            g: function() {
                Global.currentTest.execution.push("d.g");
                // console.log("execute default g");
                return "Hello";
            },
            print: function() {
                return this.myString;
            },
            toString: function() {
                return "object1"
            }

        };
    };

    var htmlLayer;
    var makeHtmlLayer = function() {
        var layer = cop.basicCreate('LmakeHtmlLayer');
        cop.ensurePartialLayer(layer, object1)["print"] =  function() {
            return "<b>"+ cop.proceed() + "</b>";
        };
        layer.toString = function() {return "Layer HTML";};
        htmlLayer = layer;
    };


    var layer1;
    var makeLayer1 = function() {
        layer1 = cop.create('LmakeLayer1');
        cop.layerObject(layer1, object1, {
            f: function(a, b) {
                Global.currentTest.execution.push("l1.f");
                console.log("execute layer1 function for f");
                return cop.proceed(a, b) + a;
            }
        });
        layer1.toString = function() {return "Layer L1";};
    };

    var layer2;
    var makeLayer2 = function() {
        layer2 = cop.basicCreate('makeLayer2');
        cop.layerObject(layer2, object1, {
            f: function(a, b) {
                Global.currentTest.execution.push("l2.f");
                // console.log("execute layer2 function for f");
                return cop.proceed(a, b) + b;
            },
            g: function() {
                Global.currentTest.execution.push("l2.g");
                // console.log("execute default g");
                return cop.proceed() + " World";
            }
        });
        layer2.toString = function() {return "Layer L2"};
    };

    var emptyLayer;
    var makeEmptyLayer = function() {
        emptyLayer = cop.basicCreate('LEmpty');
        emptyLayer.toString = function() {return "Empty Layer"};
    };

    var layer3;
    var makeLayer3 = function() {
        layer3 = cop.basicCreate('LmakeLayer3');;
        cop.layerObject(layer3, object1, {
            f: function(a, b) {
                Global.currentTest.execution.push("l3.f");
                // console.log("execute layer3 function for f");
                return cop.proceed() * 10;
            }
        });
        layer3.toString = function() {return "Layer L3"};
    };

    it('can create a Layer', function() {
        cop.create("DummyLayer2");
        assert.isDefined(Global.DummyLayer2);
        assert(Global.DummyLayer2.toString(), "DummyLayer2");
    });

    it('can create a Layer in a namespace', function() {
        cop.tests.DummyLayer3 = cop.create("cop.tests.DummyLayer3");
        assert.isDefined(cop.tests.DummyLayer3);
        assert(cop.tests.DummyLayer3.toString(), "DummyLayer3");
    });


    it('can inspect the current layers', function() {
        makeObject1();
        makeLayer1();
        cop.withLayers([layer1], function() {
            assert(layer1, "no layer1");
            assert(cop.currentLayers().first(), "currentLayers failed");
        });
    });

    it('testOneLayer', function() {
        makeObject1();
        makeLayer1();
        assert.equal(object1.f(2,3), 0, "default result of f() failed");
        cop.makeFunctionLayerAware(object1,"f");
        assert.equal(object1.f(2,3), 0, "default result of f() with layer aware failed");
        cop.withLayers([layer1], function() {
            var r = object1.f(2,3);
            assert.equal(r, 2, "result of f() failed");
            assert.equal(String(Global.currentTest.execution), [ "d.f", "d.f", "l1.f", "d.f"]);
        }.bind(this));

      });

    it('testTwoLayers', function() {
          makeObject1();
          makeLayer1();
          makeLayer2();
        cop.withLayers([layer1, layer2], function() {
            assert.equal(object1.f(3,4), 7, "result of f() failed");
            assert.equal(Global.currentTest.execution.toString(), ["l2.f", "l1.f", "d.f"]);
        });
      });

    it('testTwoLayerInverse', function() {
          makeObject1();
          makeLayer1();
          makeLayer2();
        cop.withLayers([layer2, layer1], function() {
            cop.makeFunctionLayerAware(object1,"f");
            object1.f();
            assert.equal(Global.currentTest.execution.toString(), ["l1.f", "l2.f", "d.f"]);
        });
      });

    it('testThreeLayers', function() {
          makeObject1();
          makeLayer1();
          makeLayer2();
          makeLayer3();
        cop.withLayers([layer1, layer2, layer3], function() {
            cop.makeFunctionLayerAware(object1,"f");
            cop.makeFunctionLayerAware(object1,"g");
            object1.f();
            var r = object1.g();
            assert.equal(r, "Hello World", "result of g() is wrong");
            assert.equal(Global.currentTest.execution.toString(), ["l3.f", "l2.f","l1.f", "d.f", "l2.g", "d.g"]);
        }.bind(this));
      });

    it('testTwoLayersAndEmpty', function() {
          makeObject1();
          makeEmptyLayer();
          makeLayer1();
          makeLayer2();
        cop.withLayers([layer1, emptyLayer, layer2], function() {
            object1.f();
            assert.equal(Global.currentTest.execution.toString(), ["l2.f","l1.f", "d.f"]);
        }.bind(this));

      });

    it('testHTMLLayerExample', function() {
          makeObject1();
          makeHtmlLayer();
        cop.makeFunctionLayerAware(object1,"print");
        cop.withLayers([htmlLayer], function() {
            assert.equal(object1.print(), "<b>"+object1.myString + "</b>", "html print does not work")
        }.bind(this));
    });

    it('testLayerClass', function() {
        var layer1 = cop.basicCreate('LtestLayerClass');
        cop.layerClass(layer1, cop.example.DummyClass, {
            f: function(a, b) {
                this.execution.push("l1.f");
                // console.log("execute layer1 function for f");
                return cop.proceed() + a;
            },
        });
        var object1 = new cop.example.DummyClass();
        cop.makeFunctionLayerAware(cop.example.DummyClass.prototype,"f");

        assert.equal(object1.f(2,3), 0, "default result of f() with layer aware failed");
        cop.withLayers([layer1], function() {
            var r = object1.f(2,3);
            assert.equal(r, 2, "result of f() failed");
            assert.equal(object1.execution.toString(), ["d.f", "l1.f", "d.f"]);
        }.bind(this))
      });

    it('testNestedLayerInClass', function() {
        var o = new cop.example.DummyClass();

        cop.withLayers([DummyLayer], function() {
            assert.equal(o.h(), 3, "outer layer broken");
            cop.withLayers([DummyLayer3], function() {
                // console.log("Layers: " + cop.currentLayers());
                // cop.currentLayers().each(function(ea){
                //     var p = ea[cop.example.DummyClass.prototype];
                //     if (p) {
                //         console.log("" + ea + ".h : " + p.h)
                //     }})
                assert.equal(o.h(), 4, "inner layer broken");
            }.bind(this))
        }.bind(this));
        // console.log("LOG: " + o.log)

      });

    it('testLayerObject', function() {
        var layer1 = cop.basicCreate('LtestLayerObject');
        makeObject1();
        cop.layerObject(layer1, object1, {
            f: function(a, b) {
                Global.currentTest.execution.push("l1.f");
                // console.log("execute layer1 function for f");
                return cop.proceed() + a;
            },
        });
        cop.withLayers([layer1], function() {
            var r = object1.f(2);
            assert.equal(r, 2, "result of f() failed");
            assert.equal(Global.currentTest.execution.toString(), ["l1.f", "d.f"]);
        }.bind(this));
      });

    // How to lookup objects in layers
    it('testObjectAsDictionaryKeys', function() {
        // it seems that the string value is used as the "key" in dictionary lookups
        var a = {name: "foo", toString: function() {return this.name}};
        var b = {name: "bar", toString: function() {return this.name}};
        var d = {};
        d[a] = 1;
        d[b] = 2;
        assert.equal(d[a], 1, "objects as keys are broken")
    });

    it('testLayerObjectsInOneLayer', function() {
        var layer = cop.basicCreate('LtestLayerObjectsInOneLayer');
        var o1 = {f: function() {return 1}};
        var o2 = {f: function() {return 2}};
        cop.layerObject(layer, o1, {
            f: function() {
                return 3
            },
        });
        cop.layerObject(layer, o2, {
            f: function() {
                return 4
            },
        });
        cop.withLayers([layer], function() {
            assert.equal(o1.f(), 3, "result of o1.f() failed");
            assert.equal(o2.f(), 4, "result of o2.f() failed");
        }.bind(this));
    });

    it('testLayerMethod', function() {
        var object1 = {f: function() {return 0}, g: function() {}},
            layer1 = cop.basicCreate('LtestLayerMethod');

        cop.layerMethod(layer1, object1, "f", function(){
            return cop.proceed() + 1});

        assert(cop.getLayerDefinitionForObject(layer1, object1).f, "f did not get stored");

        cop.layerMethod(layer1, object1, "g", function(){});

        assert(cop.getLayerDefinitionForObject(layer1, object1).f, "f did not get stored");
        assert(cop.getLayerDefinitionForObject(layer1, object1).g, "g did not get stored");
    });

    it('testLayerInClass', function() {
        var o = new cop.example.DummyClass();
        assert(!o['DummyLayer$f'], "layer code ended up in class");
        assert(cop.getLayerDefinitionForObject(DummyLayer, cop.example.DummyClass.prototype).f, "f did not end up in DummyLayer");
        assert(cop.getLayerDefinitionForObject(DummyLayer, cop.example.DummyClass.prototype), "DummyLayer2 has no partial class");
        assert(cop.getLayerDefinitionForObject(DummyLayer, cop.example.DummyClass.prototype).h, "DummyLayer2 has no method for h");
    });

    it('testLayerActivation', function() {
        var layer1 = cop.basicCreate('LtestLayerActivation');
        var oldLength = cop.currentLayers().length;
        cop.withLayers([layer1], function() {
            assert.equal(cop.currentLayers().length, oldLength + 1, "layer1 is not actived");
        }.bind(this));
        assert.equal(cop.currentLayers().length, oldLength, "layer1 is not deactived");
      });

    it('testNestedLayerActivation', function() {
        var layer1 = cop.basicCreate('LtestNested1'),
            layer2 = cop.basicCreate('LtestNested1');
        assert.equal(cop.currentLayers().length, 0, "there are active layers where there shouldn't be ")
        cop.withLayers([layer1], function() {
            assert.equal(cop.currentLayers().length, 1, "layer1 is not active");
            cop.withLayers([layer2], function() {
                assert.equal(cop.currentLayers().length, 2, "layer2 is not active");
            }.bind(this));
            assert.equal(cop.currentLayers().length, 1, "layer2 is not deactivated");
        }.bind(this));
        assert.equal(cop.currentLayers().length, 0, "layer1 is not deactivated");
      });

    it('testNestedLayerDeactivationAndActivation', function() {
        var layer1 = cop.basicCreate('l1'),
            layer2 = cop.basicCreate('l2'),
            layer3 = cop.basicCreate('l3');
        cop.withLayers([layer1, layer2, layer3], function() {
            cop.withoutLayers([layer2], function() {
                assert.equal(cop.currentLayers().toString(), ["l1","l3"].toString());
                cop.withLayers([layer2], function() {
                    assert.equal(cop.currentLayers().toString(), ["l1","l3","l2"].toString());
                }.bind(this));
            }.bind(this));
        }.bind(this));
      });

    it('testDuplicateLayerActivation', function() {
        var layer1 = cop.basicCreate('LtestDup');
        cop.withLayers([layer1], function() {
            cop.withLayers([layer1], function() {
                assert.equal(cop.currentLayers().length, 1, "layer1 activated twice");
            }.bind(this));
            assert.equal(cop.currentLayers().length, 1, "layer1 is deactivated");
        }.bind(this));
      });

    it('testLayerDeactivation', function() {
        var layer1 = cop.basicCreate('LtestLayerDeactivation1');
        var layer2 = cop.basicCreate('LtestLayerDeactivation2');
        cop.withLayers([layer1, layer2], function() {
            cop.withoutLayers([layer2], function() {
                assert.equal(cop.currentLayers().length, 1, "layer2 is not deactiveated");
            }.bind(this));
            assert.equal(cop.currentLayers().length, 2, "layer2 is not reactivated");
        }.bind(this));
      });

    it('testErrorInLayeredActivation', function() {
        var layer1 = cop.basicCreate('LtestErrorInLayeredActivation')
        makeObject1();
        cop.layerObject(layer1, object1, {
            f: function() {
                throw {testError: true}
            },
        });
        try {
            cop.withLayers([layer1], function() {
                object1.f();
            }.bind(this));
        } catch (e) {
            if (!e.testError) throw e;
            assert.equal(cop.currentLayers().length, 0, "layer1 is still active");

        }
      });

    it('testErrorInLayeredDeactivation', function() {
        var layer1 = cop.basicCreate('LtestErrorInLayeredDeactivation');
        makeObject1();
        cop.layerObject(layer1, object1, {
            f: function() {
                throw {testError: true};
            },
        });
        cop.withLayers([layer1], function() {
            try {
                cop.withoutLayers([layer1], function() {
                    assert.equal(cop.currentLayers().length, 0, "layer1 deactivation is not active");
                    object1.f();
                }.bind(this));
            } catch (e) {
                if (!e.testError) throw e;
            };
            assert.equal(cop.currentLayers().length, 1, "layer1 deactivation is still active");
        }.bind(this));
      });


    it('testComposeLayers', function() {
        var layer1 = {toString: function(){return "l1"}};
        var layer2 = {toString: function(){return "l2"}};
        var layer3 = {toString: function(){return "l3"}};

        var stack = [{}];
        assert.equal(cop.composeLayers(stack.clone()).toString(), [].toString());
        assert.equal(cop.composeLayers([{}, {withLayers: [layer1]}]).toString(), ["l1"].toString());
        assert.equal(cop.composeLayers([{}, {withLayers: [layer1]},{withLayers: [layer2, layer3]} ]).toString(), ["l1","l2","l3"].toString());
      });

    it('testComposeLayersWithWithoutLayers', function() {
        var layer1 = {toString: function(){return "l1"}},
            layer2 = {toString: function(){return "l2"}},
            layer3 = {toString: function(){return "l3"}};

        var stack = [{}];
        assert.equal(
            cop.composeLayers([
                {},
                {withLayers: [layer1, layer2, layer3]},
                {withoutLayers: [layer2]}]).toString(),
            ["l1","l3"].toString());

      });

    it('testThisReferenceInLayeredMethod', function(){
        var test = this,
            layer1 = cop.basicCreate('testThisReferenceInLayeredMethod')
        makeObject1();
        layer1.refineObject(object1, {
            f: function() {
                test.thisIsBound = object1 === this;
            }/*.binds({test: test})*/,
        });
        cop.withLayers([layer1], function() {
            object1.f();
        });
        assert(test.thisIsBound, "this is not object1 in layer");
    });

    it('testGlobalLayers', function() {
        var layer1 = {name: "Layer1"};
        var layer2 = {name: "Layer2"};
        cop.enableLayer(layer1);
        cop.enableLayer(layer2);
        assert.strictEqual(cop.GlobalLayers[0], layer1, "layer1 not global");
        assert.strictEqual(cop.GlobalLayers[1], layer2, "layer2 not global");
        cop.disableLayer(layer1);
        assert.strictEqual(cop.GlobalLayers[0], layer2, "layer1 not removed from global");
        cop.disableLayer(layer2);
        assert.strictEqual(cop.GlobalLayers.length, 0, "global layers still active");
    });

    it('testEnableDisableLayer', function() {
        var layer1 = cop.basicCreate("Layer1");
        cop.enableLayer(layer1);
        assert.equal(cop.currentLayers().length, 1, "layer 1 is not enabled");
        // console.log("current layers: " + cop.currentLayers())
        cop.disableLayer(layer1);
        assert(!cop.LayerStack.last().composition, "there is a cached composition!");
        assert.equal(cop.currentLayers().length, 0, "layer 1 is not disabeled");
    });


    it('testEnableLayersInContext', function() {
        var layer1 = cop.basicCreate("Layer1"),
            layer2 = cop.basicCreate("Layer2");
        cop.withLayers([layer2], function() {
            cop.enableLayer(layer1);
            assert.equal(cop.currentLayers().length, 2, "layer 2 is not enabled");
        }.bind(this));
        assert.equal(cop.currentLayers().length, 1, "layer 1 is not enabled");
        cop.disableLayer(layer1);
    });

    it('testEnableLayersInContextAgain', function() {
        var layer1 = cop.basicCreate('Layer1');
        cop.withLayers([layer1], function() {
            cop.enableLayer(layer1);
            assert.equal(cop.currentLayers().length, 1, "layer 1 enabled twice?");
        }.bind(this));
        assert.equal(cop.currentLayers().length, 1, "layer 1 is not enabled");
    });

    it('testLayerSubclass', function() {
        var o = new cop.example.DummySubclass();

        assert(o.f2.isLayerAware, "function is not layer aware when subclassing not directly from object")

    });

    it('testNewMethodOnlyInLayer', function() {
        var o = new cop.example.DummyClass();
        cop.withLayers([DummyLayer], function() {
            assert(o.newMethod, "new method is not there");
            assert.equal(o.newMethod(), "totally new","layered newMethod() is wrong");

        }.bind(this));
      });


    it('testLayerMethodInSubclass', function() {
        var o = new cop.example.DummySubclass();
        assert.equal(o.m1(), 10, "subclassing is broken")
        cop.withLayers([DummyLayer], function() {
            assert.equal(o.m1(), 11, "layer in subclass is broken")
        }.bind(this));
      });

      it('testLayerMethodInSecondSubclass', function() {
        var o = new cop.example.SecondDummySubclass();
        assert.equal(o.m1(), 1, "base is broken")
        cop.withLayers([DummyLayer], function() {
            assert.equal(o.m1(), 101, "layer in second subclass is broken")
        }.bind(this));
      });

      it('testSetWithLayers', function() {
          var o = new cop.example.DummySubclass();
          assert.equal(o.fooo(), "base", "base is broken");
          cop.withLayers([DummyLayer], function() {
              assert.equal(o.fooo(), "base-layer-newFoo", "SecondDummySubclass is broken");
          }.bind(this));
      });

      it('testExecuteLayeredBehaviorOfSuperclass', function() {
          var o = new cop.example.DummySubclass();
           cop.withLayers([DummyLayer], function() {
              assert.equal(o.newFoo(), "newFoo", "newFoo is broken");
          }.bind(this));
      });


      it('testDoNotOverideLayeredMethodInSubclass', function() {
          var o = new cop.example.DummyClass();
           cop.withLayers([DummyLayer], function() {
              assert.equal(o.m2(), "D$m2,m2", "installing wrappers on base class broken");
          }.bind(this));

          var s = new cop.example.DummySubclass();
           cop.withLayers([DummyLayer], function() {
              assert.equal(s.m2(), "S$m2", "not installing wrappers on subclassing broken`");
          }.bind(this));
      });
    it('testLayerRemove', function() {
        makeObject1();
        var layer = cop.create('TestLayerRemoveLayer').refineObject(object1, {
            f: function(x) { return x }
        }).beGlobal();

        assert.equal(3, object1.f(3), 'layer not global');
        assert(Global.TestLayerRemoveLayer, 'layer not in Namespace');

        layer.remove();

        assert.equal(0, object1.f(3), 'layer still global');
        assert.isUndefined(Global.TestLayerRemoveLayer, 'layer still in Namespace');
    });
    it('testLayersRememberSourceModule', function() {
        assert(DummyLayer.sourceModule, 'no sourceModule');
        assert(DummyLayer.sourceModule == cop.tests.LayerTests, 'wrong sourceModule');
    });

    describe('argument adaption', function () {
        it('testAdaptArgumentsInLayer', function () {
            var o = {say: function(a) {return "Say: " +a}},
                l = cop.basicCreate('L')
                    .refineObject(o, { say: function(a) {return cop.proceed(a + " World") + "!"}})
            assert.equal(o.say("Hello"), "Say: Hello", "test is broken");
            cop.withLayers([l], function() {
                console.group("SayHello");
                var result = o.say("Hello")
                console.groupEnd("SayHello");
                assert.equal(result, "Say: Hello World!", "adapting arguments is broken");
            }.bind(this));
        });
    });

    describe('Layer', function () {
        var tmpClassName = 'TmpDummyClass',
            tmpSubclassName = 'TmpDummySubclass',
            tmpLayerName = 'TmpDummyLayer',
            tmpLayer2Name = 'TmpDummyLayer2';

        beforeEach('set up the test classes and layers', function () {
            Object.subclass(tmpClassName, {});
            Global[tmpClassName].subclass(tmpSubclassName, {});
            cop.create(tmpLayerName);
            cop.create(tmpLayer2Name);
        });

        var dummyClass = function() {
            return Global[tmpClassName];
        };

        var dummySubclass = function() {
            return Global[tmpSubclassName];
        };

        var dummyLayer = function() {
            return Global[tmpLayerName];
        };

        var dummyLayer2 = function() {
            return Global[tmpLayer2Name];
        };

        afterEach('remove test classes and layers', function() {
            console.log("tear down classes....")
            Global[tmpSubclassName] = undefined;
            Global[tmpClassName] = undefined;
            Global[tmpLayerName] = undefined;
            Global[tmpLayer2Name] = undefined;
        });

        describe('subclassing', function () {

            it('testSetup', function() {
                assert(dummyClass());
                assert(dummySubclass());
                assert(dummyLayer());
            });

            it('testLayerClassAndSubclasses', function() {
                dummyClass().addMethods({
                    m1: function(){return "m1"},
                });

                dummySubclass().addMethods({
                    m1: function(){return "S$m1"},
                    m2: function(){return "S$m2"},
                });

                cop.layerClassAndSubclasses(dummyLayer(), dummyClass(), {
                    m1: function() {return "L$m1,"+cop.proceed()}
                });

                assert(dummySubclass().prototype.m1.isLayerAware,  "overriden m1 is not layer aware")
                assert(!dummySubclass().prototype.m2.isLayerAware,  "overriden m2 is layer aware, but it should't")

                var o = new (dummyClass())();
                assert.equal(o.m1(), "m1", "base m1 broken");
                cop.withLayers([dummyLayer()], function() {
                    assert.equal(o.m1(), "L$m1,m1", "layered m1 broken");
                }.bind(this))

                var s = new (dummySubclass())();
                assert.equal(s.m1(), "S$m1", "base S$m1 broken");
                cop.withLayers([dummyLayer()], function() {
                    assert.equal(s.m1(), "L$m1,S$m1", "layered S$m1 broken");
                }.bind(this))
            });

            it('testLayerClassAndSubclassesWithSuper', function() {
                dummyClass().addMethods({
                    m1: function() { return "m1" },
                });

                dummySubclass().addMethods({
                    m1: function($super) { return "S$m1a " + $super() + " S$m1b" }
                });

                cop.layerClassAndSubclasses(dummyLayer(), dummyClass(), {
                    m1: function() { return "L$m1a " + cop.proceed() + " L$m1b" }
                });


                var o = new (dummyClass())();
                assert.equal(o.m1(), "m1", "unlayered m1 in superclass broken");

                cop.withLayers([dummyLayer()], function() {
                    assert.equal(o.m1(), "L$m1a m1 L$m1b", "layered m1 broken");
                }.bind(this))

                var s = new (dummySubclass())();
                assert.equal(s.m1(), "S$m1a m1 S$m1b", "base S$m1 broken");
                cop.withLayers([dummyLayer()], function() {
                    assert.equal(s.m1(), "L$m1a S$m1a L$m1a m1 L$m1b S$m1b L$m1b", "layered S$m1 broken");
                }.bind(this))
            });


            it('testMultipleLayerDefintions', function() {
                dummyClass().addMethods({m1: function() { return "m1" }});

                dummySubclass().addMethods({m1: function() { return "S$m1" }});

                cop.layerClassAndSubclasses(dummyLayer(), dummyClass(), {
                    m1: function() {return "L$m1,"+cop.proceed()}
                });

                cop.layerClassAndSubclasses(dummyLayer2(), dummySubclass(), {
                    m1: function() {return "L$m1,"+cop.proceed()}
                });

                var s = new (dummySubclass())();
                cop.withLayers([dummyLayer()], function() {
                    assert.equal(s.m1(), "L$m1,S$m1", "layered S$m1 broken");
                }.bind(this))
            });
        });

        describe('alternative syntax', function () {

            it('testNewSyntax', function() {
                var l = cop.create("MyDummyLayer2");
                assert(l instanceof Layer, "l is no layer")
                assert(l.layerClass instanceof Function, "l does not respond to layerClass")
                assert(l.layerObject instanceof Function, "l does not respond to layerObject")
            });

            it('testCreateLayer', function() {
                var l = cop.create("MyDummyLayer2");
                assert(l instanceof Layer, "l is no layer")
            });

            it('testRefineClass', function() {
                var l = cop.create("MyDummyLayer2");
                assert(l.refineClass instanceof Function, "l does not respond to refineClass")
            });

            it('testRefineObject', function() {
                var l = cop.create("MyDummyLayer2");
                assert(l.refineObject instanceof Function, "l does not respond to refineObject")

                var o = {foo: function() {return 1}}
                var r = l.refineObject(o, {
                    foo: function() { }
                });

                assert.strictEqual(l, r, "refineObject does not return layer")
            });

            it('testBeGlobal', function() {
                var l = cop.create("MyDummyLayer2");
                l.beGlobal();
                assert(cop.GlobalLayers.include(l), "be global is broken")

            });
        });
    });

    /*
     * Test for Getter and Setter Functionality
     * (Supportet in Mozilla, WebKit et al)
     *
     */
    describe('getters and setters', function () {

        cop.tests.GetterAndSetterTestDummy = Object.subclass("cop.tests.GetterAndSetterTestDummy", {
            initialize: function() {
                this.a = 3;
                this.d = 5;
            },
            get b() {
                return this.a + 1;
            },
            set c(p) {
                this.a = p * 2;
            },
            get d() {
                return this._d * 2
            },
            set d(v) {
                this._d = v
            },
        });

        it('testGetterInObject', function() {
            var o = { get b() { return 4}};
            assert.equal(o.b, 4, "getter method is not supported");
        });

        it('testDefineGetter', function() {
            var o = {};
            o.__defineGetter__("b", function(){return 4});
            assert.equal(o.b, 4, "__defineGetter__ is not supported");
        });

        it('testDefineSetter', function() {
            var o = {a: 0};
            o.__defineSetter__("b", function(v){this.a = v});
            o.b = 4;
            assert.equal(o.a, 4, "__defineSetter__ is not supported");
        });

        it('testLookupGetter', function() {
            var o = {};
            var f1 = function(){return 4};
            o.__defineGetter__("b", f1);
            var f2 = o.__lookupGetter__("b");
            assert.equal(f1, f2, "__lookupGetter__ is not supported");
        });

        it('testLookupSetter', function() {
            var o = {};
            var f1 = function(v){};
            o.__defineSetter__("b", f1);
            var f2 = o.__lookupSetter__("b");
            assert.equal(f1, f2, "__lookupGetter__ is not supported");
        });

        it('testSubclassWithGetterAndSetter', function() {
            var o = new cop.tests.GetterAndSetterTestDummy();
            assert.equal(o.b, 4, "subclass getter broken");
            o.c = 5;
            assert.equal(o.a, 10, "subclass setter broken");
        });

        it('testOverideWithGetterInClass', function() {
            var o = new cop.tests.GetterAndSetterTestDummy();
            o.d = 7
            assert.equal(o.d, 14, "subclass getter broken");
        });
    });

    describe('layer state', function () {
        var MyTestLayer1 = cop.create("MyTestLayer1");
        var MyTestLayer2 = cop.create("MyTestLayer2");

        cop.tests.MyClass = Object.subclass('cop.tests.MyClass', {
            initialize: function() {
                this.a = 7;
            },
            get MyTestLayer1$a() {
                return this._MyLayer_a;
            },
            set MyTestLayer1$a(v) {
                this._MyLayer_a = v;
            },
            get MyTestLayer2$a() {
                return this._MyLayer2_a;
            },
            set MyTestLayer2$a(v) {
                this._MyLayer2_a = v;
            },
        });

        it('testMakePropertyLayerAware', function() {
            var o = {a: 3};
            debugger;
            cop.makePropertyLayerAware(o,"a");

            assert.equal(o.a, 3, "getter is broken");
            o.a = 4;
            assert.equal(o.a, 4, "setter is broken");

            var getter = o.__lookupGetter__("a");
            assert(getter, "o has not getter for a");
            assert(getter.isLayerAware || getter.isInlinedByCop, "o.a getter is not layerAware");

            var setter = o.__lookupSetter__("a");
            assert(setter, "o has not setter for a");
            assert(setter.isLayerAware || getter.isInlinedByCop, "o.a setter is not layerAware");


        });

        it('testLayerGetter', function() {
            var o = {a: 5};

            var layer1 = cop.basicCreate('L1');
            assert.equal(o.a, 5, "property access is broken");
            layer1.refineObject(o, {get a() { return 10 }})

            var layer2 = cop.basicCreate('L2');
            cop.withLayers([layer1], function() {
                assert.equal(o.a, 10, "layer getter broken");
                cop.withLayers([layer2], function() {
                    assert.equal(o.a, 10, "with empty innner layer getter broken");
                });
            });
            assert.equal(o.a, 5, "layer getter broken after activation");
        });

        it('testLayerGetterAndSetter', function() {
            var o = {a: 5};
            var layer1 = cop.create('L1');
            assert.equal(o.a, 5, "property access is broken");

            o.l1_value = 10;
            layer1.refineObject(o, {
                get a() { return this.l1_value },
                set a(value) { return this.l1_value = value }
            });
            assert(
                cop.getLayerDefinitionForObject(layer1,o).__lookupSetter__("a"),
                "layer1 hast no setter for a");
                assert(o.__lookupSetter__("a").isLayerAware, "o.a setter is not layerAware");

                cop.withLayers([layer1], function() {
                    assert.equal(o.a, 10, "layer getter broken");
                    o.a = 20;
                    assert.equal(o.l1_value, 20, "layer setter broken");
                }.bind(this));
        });

        it('testLayerStateInTwoObjects', function() {
            var o1 = new cop.example.DummyClass(),
                o2 = new cop.example.DummyClass(),
                layer1 = cop.basicCreate('LtestLayerStateInTwoObjects1');
            cop.layerClass(layer1, cop.example.DummyClass, {
                get a() { return this.l1_value },
                set a(value) { this.l1_value = value },
            });
                cop.withLayers([layer1], function() {
                    o1.a = 20;
                    o2.a = 30;
                    assert.equal(o1.a, 20, "layer state in two objects broken");
                    assert.equal(o2.a, 30, "layer state in two objects broken 2");
                }.bind(this));
        });

        it('testGetterAndSetterClassInLayer', function() {
            var o = new cop.example.DummyClass();
            o.toString = function(){return "[o]"};
            var o2 = new cop.example.DummyClass();
            o2.toString= function(){return "[o2]"};
            var layer1 = cop.create('LtestGetterAndSetterClassInLayer');
            cop.layerClass(layer1, cop.example.DummyClass, {
                get a() {
                    return 10;
                },
            });
            o.a = 5; // initialize works only after layer installation
            o2.a = 7; // initialize works only after layer installation
            assert(cop.example.DummyClass.prototype.__lookupGetter__("a"), "DummyClass has no getter for a");
            assert(o.__lookupGetter__("a"), "o.a has no getter");

            assert.equal(o.a, 5, "layer getter broken after initialization");
            cop.withLayers([layer1], function() {
                assert.equal(o.a, 10, "layer getter broken");
            }.bind(this));
            assert.equal(o.a, 5, "layer getter broken after activation");
            assert.equal(o2.a, 7, "layer getter broken after activation for o2");
        });

        it('testGetterLayerInClass', function() {
            var o = new cop.example.DummyClass();
            assert(o.__lookupGetter__("e"), "o.e has no getter");
            assert.equal(o.e, "Hello", "layer getter broken after initialization");
            cop.withLayers([DummyLayer], function() {
                o.e = "World"
                assert.equal(o.e, "World", "layer getter broken");
            }.bind(this));
            assert.equal(o.e, "Hello", "layer getter broken after activation");
            cop.withLayers([DummyLayer], function() {
                assert.equal(o.e, "World", "layer does not remember state");
            }.bind(this));

        });

        it('testGetterProceed', function() {
            var o = new cop.example.DummyClass();
            cop.withLayers([DummyLayer], function() {
                assert.equal(o.m, "Hello World", "layer getter broken");
            }.bind(this));
        });

        it('testLayerInstallation', function() {
            assert(cop.getLayerDefinitionForObject(DummyLayer, cop.example.DummyClass.prototype).__lookupGetter__("e"), "no getter in partial class");
            assert(cop.example.DummyClass.prototype.__lookupGetter__("e"), "no getter in class");
        });

        it('testLayerPropertyWithShadow', function() {
            var o = {}, layer1 = cop.create('LtestLayerPropertyWithShadow');
            cop.layerPropertyWithShadow(layer1, o, "a");
            o.a = 5;
            cop.withLayers([layer1], function() {
                o.a = 10;
                assert.equal(o.a, 10, "shadow broken");
            });
            assert.equal(o.a, 5, "shadow don't changes base");
            cop.withLayers([layer1], function() {
                assert.equal(o.a, 10, "shadow broken 2");
            });
        });

        it('testLayerClassPropertyWithShadow', function() {
            var o = new cop.example.DummyClass();
            cop.layerPropertyWithShadow(DummyLayer, o, "a");
            o.a = 5;
            cop.withLayers([DummyLayer], function() {
                o.a = 10;
                assert.equal(o.a, 10, "shadow broken");
            });
            assert.equal(o.a, 5, "shadow breaks base");
            cop.withLayers([DummyLayer], function() {
                assert.equal(o.a, 10, "shadow broken 2");
            });
        });

        it('testLayerPropertyWithShadowFallsBack', function() {
            var o = {};
            var layer1 = cop.basicCreate('LtestLayerPropertyWithShadowFallsBack');
            cop.layerPropertyWithShadow(layer1, o, "a");
            o.a = 5;
            cop.withLayers([layer1], function() {
                assert.equal(o.a, 5, "fallback is broken");
            }.bind(this));
        });

        it('testNestedStateAccess', function() {
            var o = new cop.tests.MyClass();
            cop.withLayers([MyTestLayer1], function() {
                o.a = 9;
                cop.withLayers([MyTestLayer2], function() {
                    o.a = 10;
                }.bind(this));
            }.bind(this));
            var self = this;
            cop.withLayers([MyTestLayer1], function() {
                assert.equal(o.a, 9, "outer layer broken")
                cop.withLayers([MyTestLayer2], function() {
                    assert.equal(o.a, 10, "inner layer broken")
                }.bind(this));
            }.bind(this));
        });
    });

    describe('layer object activation', function () {
        var DummyLayerableObject = LayerableObject.subclass("DummyLayerableObject", {

            initialize: function() {
                this.otherObject = new DummyOtherObject();
                this.myObject = new DummyOtherObject();
                this.myObject.owner = this;
            },

            f: function() {
                return 3
            },

            DummyLayer$f: function() {
                return 4
            },

            k1: function() {
                return this.otherObject.k();
            },

            k2: function() {
                return this.myObject.k();
            },

            DummyLayer$thisRef: function() {
                return this
            }
        });

        var DummyOtherObject = LayerableObject.subclass("DummyOtherObject", {

            lookupLayersIn: ["owner"],

            initialize: function() {
                this.count_dummy_k = 0;
            },


            k: function() {
                return 5
            },

            DummyLayer$k: function() {
                cop.proceed();
                this.count_dummy_k = this.count_dummy_k + 1;
                return 7
            },

        });

        var o;
        beforeEach('initialize the test object', function () {
            o = new DummyLayerableObject();
        });

        it('testSetAndGetActiveLayers', function() {
            o.setWithLayers([DummyLayer]);
            var layers = o.withLayers;
            assert(layers, "no layers active")
        });

        it('testDummyObjectDefault', function() {
            assert.equal(o.f(), 3, " default fails");
            cop.withLayers([DummyLayer], function() {
                assert.equal(o.f(), 4, " dynamic layer activation is broken");
            }.bind(this));
        });

        it('testSetLayersForObject', function() {
            o.setWithLayers([DummyLayer]);
            var r = o.structuralLayers({withLayers: [], withoutLayers: []})
            assert.strictEqual(r.withLayers[0], DummyLayer, "layer not set");
            assert.equal(o.f(), 4, " layered object broken");
        });

        it('testLayerIsNotActivatedInOtherObject', function() {
            o.setWithLayers([DummyLayer]);
            assert.equal(o.k1(), 5, " layer is activated in other object?")
        });

        it('testLayerIsActivatedInMyObject', function() {
            o.setWithLayers([DummyLayer]);
            assert.equal(o.k2(), 7, " layer is not activated in my object")
        });

        it('testStateActivationAndWithLayers', function() {
            o.setWithLayers([DummyLayer]);
            cop.withLayers([DummyLayer], function() {
                assert.equal(o.k2(), 7, " layer is not activated in my object")
                assert.equal(o.myObject.count_dummy_k, 1, " layered method is excuted wrong number")
            }.bind(this));
        });

        it('testStateActivationAndWithoutLayers', function() {
            o.setWithLayers([DummyLayer]);
            cop.withoutLayers([DummyLayer], function() {
                assert.equal(o.k2(), 5, " layer is not deactivated in my object")
            }.bind(this));
        });

        it('testStateActivationAndObjectDeclaredWithoutLayers', function() {
            o.setWithLayers([DummyLayer]);
            o.myObject.setWithoutLayers([DummyLayer]);
            assert.equal(o.k2(), 5, " layer is not deactivated in my object")
        });

        it('testThisReference', function() {
            o.setWithLayers([DummyLayer]);
            assert.strictEqual(o.thisRef(), o, " 'this' reference is broken")
        });

        it('testDoubleActivation', function() {
            o.setWithLayers([DummyLayer]);
            o.myObject.setWithLayers([DummyLayer]);
            var r = o.structuralLayers({withLayers: [], withoutLayers: []})
            assert.equal(r.withLayers.length, 1);
        });

        it('testAddWithLayerTest', function() {
            o.addWithLayer(DummyLayer);
            assert(o.withLayers.length, 1, "add failed")
            o.addWithLayer(DummyLayer);
            assert(o.withLayers.length, 1, "second add failed")
            o.addWithLayer(DummyLayer2);
            assert(o.withLayers.length, 2, "third add failed")
        });

        it('testRemoveWithLayerTest', function() {
            o.setWithLayers([DummyLayer, DummyLayer2]);
            o.removeWithLayer(DummyLayer);
            assert(o.withLayers.length, 1, "remove failed")
            o.removeWithLayer(DummyLayer);
            assert(o.withLayers.length, 1, "remove failed")
        });
    });

    describe('activeLayers', function () {

        it('testOverrideActiveLayers', function() {
            var o = new cop.example.DummyClass();
            o.activeLayers = function() { return [] }
            cop.withLayers([DummyLayer], function(){
                assert.equal(o.f(), 0, "layer is still active")
            })
        });

        it('testOverrideActiveLayersWithAdditionalLayer', function() {
            // object overrides the layer composition
            var o = new cop.example.DummyClass();
            o.activeLayers= function($super) {
                return $super().concat([DummyLayer2])
            }
            cop.withLayers([DummyLayer], function() {
                assert.equal(o.f(), 1100, "active layers failed")
            })
        });
    });

    describe('proceed', function () {
        var CopProceedTestClass,
            CopProceedTestAddLayer,
            CopProceedPropertyTestLayer,
            CopProceedMultAddLayer,
            CopProceedMultipleProceedLayer;

        function setupClasses() {
            Global['CopProceedTestClass'] = undefined;

            CopProceedTestClass = Object.subclass('CopProceedTestClass', {
                m: function(a) {
                    return a * a
                },

                p: "Hello"

            });

            cop.makeFunctionLayerAware(CopProceedTestClass.prototype, 'm')
            cop.makePropertyLayerAware(CopProceedTestClass.prototype, 'p')

            CopProceedTestAddLayer = cop.create('CopProceedTestAddLayer').refineClass(CopProceedTestClass, {
                m: function(a) {
                    return cop.proceed(a + 1)
                },
            });

            CopProceedPropertyTestLayer = cop.create('CopProceedPropertyTestLayer').refineClass(CopProceedTestClass, {
                get p() {
                    return cop.proceed() + " World"
                },

                set p(value) {
                    cop.proceed(value.capitalize())
                },

            });


            CopProceedMultAddLayer = cop.create('CopProceedMultAddLayer').refineClass(CopProceedTestClass, {
                m: function(a) {
                    return cop.proceed(a) * 3
                }
            });

            CopProceedMultipleProceedLayer = cop.create('CopProceedMultipleProceedLayer').refineClass(CopProceedTestClass, {
                m: function(a) {
                    return cop.proceed(a * 2) + cop.proceed(a *3)
                }
            });
        };

        var originalProceed;
        beforeEach('setUp', function() {
            originalProceed = cop.proceed;
            setupClasses();
        });

        afterEach('tearDown', function() {
            cop.proceed = originalProceed;
        });

        it('testMakeFunctionLayerAware', function() {
            // inlining does not use proceedStack
            if (cop.staticInlining || cop.dynamicInlining) return;

            var testCase = this, newLength;
            cop.proceed = function() { newLength = cop.proceedStack.length }
            var o = {m: function() { return 1 }}
            cop.makeFunctionLayerAware(o, 'm')
            var oldLength = cop.proceedStack.length;
            o.m();
            assert(newLength > oldLength, "stack did not change")
        });

        it('testMakeFunctionLayerAwareSetsLayerComposition', function() {
            // inlining does not use proceedStack
            if (cop.staticInlining || cop.dynamicInlining) return;

            var testCase = this,
                partialMethods,
                object,
                prototypeObject,
                functionName;

            cop.proceed = function() {
                var composition = cop.proceedStack.last();
                partialMethods = composition.partialMethods;
                object = composition.object;
                prototypeObject = composition.prototypeObject;
                functionName = composition.functionName;
            }

            var o = new CopProceedTestClass();
            cop.withLayers([CopProceedTestAddLayer], function() {
                o.m();
            }.bind(this))

            assert(partialMethods, "no partialMethods")
            assert(object, "no  object")
            assert(prototypeObject, "no  prototypeObject")
            assert(functionName, "no functionName")

        });

        it('testProceedWithoutLayers', function() {
            var o = new CopProceedTestClass();
            assert.equal(o.m(2), 4, "base class broken")
        });

        it('testProceedFromAddToBase', function() {
            var o = new CopProceedTestClass();
            assert.equal(o.m(2), 4, "base class broken")
            cop.withLayers([CopProceedTestAddLayer], function() {
                assert.equal(o.m(2), 9, "add layer broken")
            }.bind(this))
        });

        it('testProceedFromMultOverAddToBase', function() {
            var o = new CopProceedTestClass();
            assert.equal(o.m(2), 4, "base class broken")
            cop.withLayers([CopProceedTestAddLayer], function() {
                cop.withLayers([CopProceedMultAddLayer], function() {
                    assert.equal(o.m(2), 27, "mult and add layer broken")
                }.bind(this))
                assert.equal(o.m(2), 9, "mult and add layer broken")
            }.bind(this))
            assert.equal(o.m(2), 4, "mult and add layer broken")
        });

        it('testMultipleProceed', function() {
            var o = new CopProceedTestClass();
            assert.equal(o.m(2), 4, "base class broken")
            cop.withLayers([CopProceedMultipleProceedLayer], function() {
                assert.equal(o.m(1), 13, "CopProceedMultipleProceedLayer")
            }.bind(this))
        });

        it('testCurrentLayerComposition', function() {
            var o = new CopProceedTestClass();
            assert.strictEqual(this.currentLayerComposition, undefined, "layer composition is undefined")
            cop.withLayers([CopProceedTestAddLayer], function() {
                assert.equal(o.m(2), 9, "add layer broken")
            }.bind(this))

        });

        it('testGetterAndSetterWithCopProceed', function() {
            var o = new CopProceedTestClass();
            assert.equal(o.m(2), 4, "base class broken")
            assert.equal(o.p, "Hello", "base getter broken")

            cop.withLayers([CopProceedPropertyTestLayer], function() {
                assert.equal(o.p, "Hello World", "getter broken")
                o.p = "hi"
                assert.equal(o.p, "Hi World", "setter broken")
            }.bind(this))
        });
    });

    describe('regressions', function () {
        it('testLookupLayeredFunctionForObjectIgnoresInheritedProperties', function() {
            var layer = new Layer();
            var obj = {foo: function() {return 3} };
            layer.refineObject(obj, {foo: function() {return cop.proceed() + 1}});
            assert.strictEqual(cop.lookupLayeredFunctionForObject(obj, layer, 'toString'), undefined, 'toString should not be found')
        });
    });

    describe('layer uninstalling', function () {

        it('testMakeFunctionLayerUnaware', function() {
            var obj = {m: function() {return 3}};
            var originalFunction = obj.m;
            cop.makeFunctionLayerAware(obj, "m");

            assert(obj.m !== originalFunction, "make layer aware failed")

            cop.makeFunctionLayerUnaware(obj, "m");

            assert(obj.m === originalFunction, "make layer unaware failed")
        });

        // FIXME: this test case uses the global connect function
        xit('testMakeFunctionLayerUnawareThatIsConnected', function() {
            var obj1 = {m1: function(a) {return a}};
            var obj2 = {m2: function(b) {
                this.b = b;
                // do nothing
            }};

            var originalFunction = obj1.m1;
            cop.makeFunctionLayerAware(obj1, "m1");

            var layerWrapper = obj1.m1;

            connect(obj1, "m1", obj2, "m2");
            var bindingsWrapper = obj1.m1;


            assert(bindingsWrapper !== layerWrapper, "binding did not work")
            assert(bindingsWrapper.originalFunction == layerWrapper, "bindings did not wrap around layer?")

            cop.makeFunctionLayerUnaware(obj1, "m1");
            assert(obj1.m1 === bindingsWrapper, "make layer unaware overwrote binding")

            obj1.m1(99)
            assert.equal(99, obj2.b);
        });

        it('testUninstallLayerInObject', function() {
            var obj1 = {
                m1: function() {return 3},
                m2: function() {return 2}
            };
            var originalM1 = obj1.m1;
            var originalM2 = obj1.m2;


            var layer = new Layer();
            layer.refineObject(obj1, {
                m1: function() { return cop.proceed() + 1 }
            });

            var layer2 = new Layer();
            layer2.refineObject(obj1, {
                m2: function() { return cop.proceed() + 1 }
            });

            cop.uninstallLayersInObject(obj1);

            assert(obj1.m1 === originalM1, "obj1.m1 is still wrapped");
            assert(obj1.m2 === originalM2, "obj2.m2 is still wrapped");

        });

        // FIXME: this test case uses Morph
        xit('testUninstallLayer', function() {
            lively.morphic.Morph.subclass('obj', {
                m1: function() { return 1 },
                m2: function() { return 2 },
                m3: function() { return 3 }
            })
            var originalM2 = obj.prototype.m2;

            cop.create('TestLayer1').refineClass(obj, {
                m1: function() { return cop.proceed() + 1 },
                m2: function() { return cop.proceed() + 1 },
                m3: function() { return cop.proceed() + 1 }
            }).beGlobal();
            var singleLayeredM1 = obj.prototype.m1;

            cop.create('TestLayer2').refineClass(obj, {
                m2: function() { return cop.proceed() + 2 },
                m3: function() { return cop.proceed() + 2 }
            }).beGlobal();

            cop.create('TestLayer3').refineClass(obj, {
                m3: function() { return cop.proceed() + 3 }
            }).beGlobal();
            var tripleLayeredM3 = obj.prototype.m3;

            TestLayer2.uninstall();

            assert(obj.prototype.m1 === singleLayeredM1, "obj.m1 is not wrapped anymore.");
            assert(obj.prototype.m2 === originalM2, "obj.m2 is still wrapped.");
            assert(obj.prototype.m3 === tripleLayeredM3, "obj.m3 is not wrapped anymore.");
        });
    });

    describe('unrefineObject', function () {
        it('testUntrefineObject', function() {
            var object = {foo: function() {return 3 }}

            var layer = new Layer("TestLayer")
            layer.refineObject(object, {
                foo: function() {
                    return cop.proceed() + 4
                }
            })

            assert(cop.getLayerDefinitionForObject(layer, object), "no layer definition")
            layer.unrefineObject(object);
            assert(cop.getLayerDefinitionForObject(layer, object) == undefined, "layer definition still there")

        });

        it('testUntrefineClass', function() {
            var klass = Object.subclass("CopDummyUnrefineClass",{
                foo: function() {return 3 }
            })

            var layer = new Layer("TestLayer")
            layer.refineClass(klass, {
                foo: function() {
                    return cop.proceed() + 4
                }
            })

            assert(cop.getLayerDefinitionForObject(layer, klass.prototype), "no layer definition")
            layer.unrefineClass(klass);
            assert(cop.getLayerDefinitionForObject(layer, klass.prototype) == undefined, "layer definition still there")

        });
    });
});

// TODO: can this be removed?
// LayerExamples = {
//     logSetPostionInMorph: function() {
//         Morph.addMethods(LayerableObjectTrait);
//         Morph.prototype.lookupLayersIn = ["owner"];
//         WindowMorph.prototype.lookupLayersIn = [""];
//         HandMorph.prototype.lookupLayersIn = [""];

//         cop.create("LogPostionLayer");
//         cop.layerClass(LogPostionLayer, Morph, {
//             setPosition: function(pos) {
//                 console.log(this + "setPosition(" + pos +")")
//                 return cop.proceed(pos);
//             }
//         });
//     }
// }

// LayerExamples.logSetPostionInMorph()
// WorldMorph.current().setWithLayers([LogPostionLayer]);

