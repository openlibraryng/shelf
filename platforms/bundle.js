module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 	    delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = global["webpackHotUpdate"];
/******/ 	global["webpackHotUpdate"] =     function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 	        hotAddUpdateChunk(chunkId, moreModules);
/******/ 	        if (parentHotUpdateCallback) {
/******/ 	            parentHotUpdateCallback(chunkId, moreModules);
/******/ 	        }
/******/ 	    }
/******/
/******/ 	    function hotDownloadUpdateChunk(chunkId) {
/******/ 	        const requestPath = './' + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 	        try {
/******/ 	            require(requestPath);
/******/ 	        } catch (e) {
/******/ 	            console.log("Hot download for update chunk failed.");
/******/ 	            console.error(e);
/******/ 	        }
/******/ 	    }
/******/
/******/ 	    function hotDownloadManifest() {
/******/ 	        return new Promise(function (resolve, reject) {
/******/ 	            const requestPath = './' + "" + hotCurrentHash + ".hot-update.json";
/******/ 	            try {
/******/ 	                const update = require(requestPath);
/******/ 	                resolve(update);
/******/ 	            } catch (e) {
/******/ 	                console.log("Hot download for manifest failed.");
/******/ 	                console.error(e);
/******/ 	                reject(e);
/******/ 	            }
/******/ 	        });
/******/ 	    }
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "6a8e31caed3b7745fc00";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./main.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/Groceries.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/platform/platform.js");
/* harmony import */ var tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/tns-core-modules/ui/dialogs/dialogs.js");
/* harmony import */ var ui_dialogs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ui_dialogs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nativescript_social_share__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/nativescript-social-share/social-share.js");
/* harmony import */ var nativescript_social_share__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nativescript_social_share__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_LoginService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./services/LoginService.js");
/* harmony import */ var _GroceryList_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./components/Groceries/GroceryList.vue");
/* harmony import */ var _components_Login_Login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./components/Login/Login.vue");
/* harmony import */ var _utils_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./utils/alert.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









const loginService = new _services_LoginService__WEBPACK_IMPORTED_MODULE_3__["default"]();
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    GroceryList: _GroceryList_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },

  data() {
    return {
      isShowingRecent: false,
      isAndroid: tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__["isAndroid"],
      grocery: "",
      listLoaded: false
    };
  },

  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_7__["mapGetters"])({
    itemList: 'itemList',
    deletedItemList: 'deletedItemList',
    isLoading: 'isProcessing'
  }), {
    items: function items() {
      // set item lists according to the list mode (using the defined vuex getters)
      return this.isShowingRecent ? this.deletedItemList : this.itemList;
    },
    pageClasses: function pageClasses() {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__["isIOS"],
        'platform-android': tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]
      };
    }
  }),

  mounted() {
    console.log('GROCERIES mounted');
  },

  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_7__["mapActions"])(['loadItems', 'restoreItems', 'addItem']), {
    load() {
      this.loadItems().then(() => {
        this.listLoaded = true;
      }).catch(error => {
        console.error(error);
        Object(_utils_alert__WEBPACK_IMPORTED_MODULE_6__["default"])("An error occurred loading your grocery list.");
      });
    },

    handleAndroidFocus() {
      // Prevent the first textfield from receiving focus on Android
      // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
      const textField = this.$refs.groceryTextField;
      const container = this.$refs.container;

      if (container.android) {
        container.android.setFocusableInTouchMode(true);
        container.android.setFocusable(true);
        textField.android.clearFocus();
      }
    },

    add(target) {
      // If showing recent groceries the add button should do nothing.
      if (this.isShowingRecent) {
        return;
      }

      const textField = this.$refs.groceryTextField.nativeView;

      if (this.grocery.trim() === '') {
        // If the user clicked the add button, and the textfield is empty,
        // focus the text field and return.
        if (target === 'button') {
          textField.focus();
        } else {
          // If the user clicked return with an empty text field show an error.
          Object(_utils_alert__WEBPACK_IMPORTED_MODULE_6__["default"])('Enter a grocery item');
        }

        return;
      } // Dismiss the keyboard


      textField.dismissSoftInput(); // adds the item

      this.addItem(this.grocery).then(() => {
        this.grocery = "";
      }).catch(() => {
        Object(_utils_alert__WEBPACK_IMPORTED_MODULE_6__["default"])("An error occurred while adding an item to your list.");
      });
    },

    toggleRecent() {
      this.isShowingRecent = !this.isShowingRecent;
    },

    showMenu() {
      Object(ui_dialogs__WEBPACK_IMPORTED_MODULE_1__["action"])({
        message: "What would you like to do?",
        actions: ["Share", "Log Off"],
        cancelButtonText: "Cancel"
      }).then(result => {
        if (result === "Share") {
          this.share();
        } else if (result === "Log Off") {
          this.logout();
        }
      });
    },

    logout: function logout() {
      loginService.logout();
      this.$navigateTo(_components_Login_Login__WEBPACK_IMPORTED_MODULE_5__["default"]);
    },

    share() {
      const list = this.itemList.map(item => item.name);
      nativescript_social_share__WEBPACK_IMPORTED_MODULE_2__["shareText"]("Groceries list:" + list.join(", ").trim());
    }

  })
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryItem.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "grocery-item",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleDoneItem() {
      if (this.item.deleted) {
        this.$store.dispatch('toggleDeleteItem', this.item).catch(() => {
          alert("An error occurred managing your grocery list.");
        });
      } else {
        this.$store.dispatch('toggleDoneItem', this.item).catch(() => {
          alert("An error occurred managing your grocery list.");
        });
      }
    },

    deleteItem() {
      this.$store.dispatch('deleteItem', this.item).catch(() => {
        alert("An error occurred managing your grocery list.");
      });
    },

    imageSource(grocery) {
      if (grocery.deleted) {
        return "res://add";
      }

      return grocery.done ? "res://checked" : "res://unchecked";
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryList.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./utils/alert.js");
/* harmony import */ var _GroceryItem_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Groceries/GroceryItem.vue");
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'grocery-list',
  components: {
    GroceryItem: _GroceryItem_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    row: {
      type: Number,
      required: true
    },
    listLoaded: {
      type: Boolean
    },
    items: {
      type: Array
    }
  },

  created() {
    console.log('GROCERY LIST created');
  }

});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Login/Login.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/platform/platform.js");
/* harmony import */ var tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LoginInitial_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Login/LoginInitial.vue");
/* harmony import */ var _LoginMain_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Login/LoginMain.vue");
/* harmony import */ var ui_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/tns-core-modules/ui/enums/enums.js");
/* harmony import */ var ui_enums__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ui_enums__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    LoginInitial: _LoginInitial_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    LoginMain: _LoginMain_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },

  data() {
    return {
      state: 'initial'
    };
  },

  computed: {
    pageClasses: function pageClasses() {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__["isIOS"],
        'platform-android': tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]
      };
    }
  },
  methods: {
    showMainContent: function showMainContent() {
      console.log('showMainContent');
      this.$refs.logoContainer.nativeView.animate({
        translate: {
          x: 0,
          y: tns_core_modules_platform__WEBPACK_IMPORTED_MODULE_0__["isAndroid"] ? -70 : -90
        },
        duration: 500,
        curve: ui_enums__WEBPACK_IMPORTED_MODULE_3__["AnimationCurve"].easeIn
      }).then(() => {
        console.log('switching from ' + this.state + ' to main');
        this.state = 'main';
      });
    },
    startBackgroundAnimation: function startBackgroundAnimation() {
      console.log('starting bg animation...');
      this.$refs.background.nativeView.animate({
        scale: {
          x: 1.0,
          y: 1.0
        },
        duration: 10000
      });
    }
  },

  mounted() {
    console.log('LOGIN mounted');
  }

});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginInitial.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'login-initial',
  props: {
    visible: Boolean
  },
  methods: {
    login: function login() {
      // fadeout and notify parent element when finished
      this.$refs.initialContainer.nativeView.animate({
        opacity: 0,
        duration: 500
      }).then(() => {
        console.log('emitting login');
        this.$emit('login');
      });
    }
  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginMain.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ui_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/ui/animation/animation.js");
/* harmony import */ var ui_animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ui_animation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/tns-core-modules/ui/dialogs/dialogs.js");
/* harmony import */ var ui_dialogs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ui_dialogs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tns_core_modules_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/tns-core-modules/color/color.js");
/* harmony import */ var tns_core_modules_color__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_color__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tns_core_modules_connectivity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/tns-core-modules/connectivity/connectivity.js");
/* harmony import */ var tns_core_modules_connectivity__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_connectivity__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Groceries_Groceries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./components/Groceries/Groceries.vue");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./models/User.js");
/* harmony import */ var _services_LoginService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./services/LoginService.js");
/* harmony import */ var _utils_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./utils/alert.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








const loginService = new _services_LoginService__WEBPACK_IMPORTED_MODULE_6__["default"]();
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'login-main',
  props: {
    visible: Boolean
  },

  data() {
    return {
      isLoggingIn: true,
      isAuthenticating: false,
      user: new _models_User__WEBPACK_IMPORTED_MODULE_5__["default"]()
    };
  },

  watch: {
    visible: function visible(val) {
      // when element turns visible, start animations
      if (val) {
        const animations = [];
        animations.push({
          target: this.$refs.mainContainer.nativeView,
          opacity: 1,
          duration: 500
        }); // Slide up the form controls and sign up container.

        animations.push({
          target: this.$refs.signUpStack.nativeView,
          translate: {
            x: 0,
            y: 0
          },
          opacity: 1,
          delay: 500,
          duration: 150
        });
        animations.push({
          target: this.$refs.formControls.nativeView,
          translate: {
            x: 0,
            y: 0
          },
          opacity: 1,
          delay: 650,
          duration: 150
        }); // Kick off the animation queue

        new ui_animation__WEBPACK_IMPORTED_MODULE_0__["Animation"](animations, false).play();
      }
    }
  },
  methods: {
    toggleDisplay() {
      this.isLoggingIn = !this.isLoggingIn;
      let mainContainer = this.$refs.mainContainer.nativeView;
      mainContainer.animate({
        backgroundColor: this.isLoggingIn ? new tns_core_modules_color__WEBPACK_IMPORTED_MODULE_2__["Color"]("white") : new tns_core_modules_color__WEBPACK_IMPORTED_MODULE_2__["Color"]("#301217"),
        duration: 200
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },

    submit() {
      console.log('submit', this.user);

      if (!this.user.isValidEmail()) {
        Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("Enter a valid email address.");
        return;
      }

      this.isAuthenticating = true;

      if (this.isLoggingIn) {
        this.login();
      } else {
        this.signUp();
      }
    },

    login() {
      if (Object(tns_core_modules_connectivity__WEBPACK_IMPORTED_MODULE_3__["getConnectionType"])() === tns_core_modules_connectivity__WEBPACK_IMPORTED_MODULE_3__["connectionType"].none) {
        Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("Groceries requires an internet connection to log in.");
        return;
      }

      return loginService.login(this.user).then(() => {
        this.isAuthenticating = false;
        console.log('navigating to groceries');
        this.$navigateTo(_components_Groceries_Groceries__WEBPACK_IMPORTED_MODULE_4__["default"]);
        console.log('navigated to groceries');
      }).catch(error => {
        console.error(error);
        Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("Unfortunately we could not find your account.");
        this.isAuthenticating = false;
      });
    },

    signUp() {
      if (Object(tns_core_modules_connectivity__WEBPACK_IMPORTED_MODULE_3__["getConnectionType"])() === tns_core_modules_connectivity__WEBPACK_IMPORTED_MODULE_3__["connectionType"].none) {
        Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("Groceries requires an internet connection to register.");
        return;
      }

      loginService.register(this.user).then(() => {
        Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("Your account was successfully created.");
        this.isAuthenticating = false;
        this.toggleDisplay();
      }).catch(error => {
        // TODO: Verify if this works
        if (error.match(/same user/)) {
          Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("This email address is already in use.");
        } else {
          Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("Unfortunately we were unable to create your account.");
        }

        this.isAuthenticating = false;
      });
    },

    forgotPassword() {
      Object(ui_dialogs__WEBPACK_IMPORTED_MODULE_1__["prompt"])({
        title: "Forgot Password",
        message: "Enter the email address you used to register for Groceries to reset your password.",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(data => {
        if (data.result) {
          this.isAuthenticating = true;
          loginService.resetPassword(data.text.trim()).then(() => {
            this.isAuthenticating = false;
            Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
          }).catch(error => {
            this.isAuthenticating = false;
            console.log('Error resetting password: ' + error);
            Object(_utils_alert__WEBPACK_IMPORTED_MODULE_7__["default"])("Unfortunately, an error occurred resetting your password.");
          });
        }
      });
    }

  },

  mounted() {
    console.log('LoginOrSignup mounted');
  }

});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/Groceries.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// extracted by mini-css-extract-plugin
    if(true) {
      // 1538829532039
      var cssReload = __webpack_require__("../node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  ;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.__hmrRefresh('style');
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryItem.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// extracted by mini-css-extract-plugin
    if(true) {
      // 1538829532058
      var cssReload = __webpack_require__("../node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  ;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.__hmrRefresh('style');
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryList.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// extracted by mini-css-extract-plugin
    if(true) {
      // 1538829532047
      var cssReload = __webpack_require__("../node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  ;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.__hmrRefresh('style');
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Login/Login.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// extracted by mini-css-extract-plugin
    if(true) {
      // 1538829532032
      var cssReload = __webpack_require__("../node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  ;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.__hmrRefresh('style');
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginInitial.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// extracted by mini-css-extract-plugin
    if(true) {
      // 1538829532051
      var cssReload = __webpack_require__("../node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  ;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.__hmrRefresh('style');
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginMain.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// extracted by mini-css-extract-plugin
    if(true) {
      // 1538829532054
      var cssReload = __webpack_require__("../node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  ;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.__hmrRefresh('style');
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Groceries/Groceries.vue?vue&type=template&id=351a791c&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    {
      ref: "page",
      class: _vm.pageClasses,
      attrs: { actionBarHidden: "true", backgroundSpanUnderStatusBar: "true" }
    },
    [
      _c(
        "GridLayout",
        {
          ref: "container",
          staticClass: "list-page",
          attrs: { rows: "auto, auto, *" },
          on: {
            loaded: function($event) {
              _vm.load()
            }
          }
        },
        [
          _c(
            "GridLayout",
            {
              staticClass: "action-bar-custom",
              attrs: { row: "0", columns: "44, *, auto" }
            },
            [
              _c("Label", { attrs: { col: "1", text: "Groceries" } }),
              _c(
                "StackLayout",
                {
                  staticClass: "menu-button-container",
                  attrs: { col: "2" },
                  on: {
                    tap: function($event) {
                      _vm.showMenu()
                    }
                  }
                },
                [
                  _c("Image", { attrs: { src: "res://menu", stretch: "none" } })
                ],
                1
              )
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              staticClass: "add-bar",
              attrs: {
                row: "1",
                columns: "auto, *, auto",
                backgroundColor: _vm.isShowingRecent ? "#BBC169" : "#CB1D00"
              }
            },
            [
              _c(
                "StackLayout",
                {
                  staticClass: "add-bar-image-container",
                  attrs: { col: "0", orientation: "vertical" },
                  on: {
                    tap: function($event) {
                      _vm.add("button")
                    }
                  }
                },
                [
                  _c("Image", {
                    attrs: {
                      src: _vm.isShowingRecent ? "res://recent" : "res://add"
                    }
                  })
                ],
                1
              ),
              _vm.isShowingRecent
                ? _c("Label", {
                    staticClass: "add-bar-recent-label",
                    attrs: { col: "1", text: "Recent items" }
                  })
                : _c("TextField", {
                    ref: "groceryTextField",
                    attrs: {
                      col: "1",
                      hint: _vm.isAndroid ? "ADD A GROCERY" : "Add a grocery",
                      returnKeyType: "done",
                      text: _vm.grocery
                    },
                    on: {
                      loaded: function($event) {
                        _vm.handleAndroidFocus()
                      },
                      returnPress: function($event) {
                        _vm.add("textfield")
                      },
                      textChange: function($event) {
                        _vm.grocery = $event.value
                      }
                    }
                  }),
              _c(
                "StackLayout",
                {
                  staticClass: "add-bar-recent-container",
                  attrs: { col: "2" },
                  on: {
                    tap: function($event) {
                      _vm.toggleRecent()
                    }
                  }
                },
                [
                  _c("Label", {
                    staticClass: "add-bar-recent-toggle",
                    attrs: { text: _vm.isShowingRecent ? "Done" : "Recent" }
                  })
                ],
                1
              )
            ],
            1
          ),
          _c("GroceryList", {
            attrs: {
              row: "2",
              listLoaded: _vm.listLoaded,
              showDeleted: _vm.isShowingRecent,
              items: _vm.items
            }
          }),
          _c("ActivityIndicator", { attrs: { busy: _vm.isLoading, row: "2" } })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryItem.vue?vue&type=template&id=5baeb89e&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "GridLayout",
    {
      staticClass: "item-container",
      attrs: { columns: "*, auto", opacity: _vm.item.done ? "0.8" : "1" }
    },
    [
      _c(
        "GridLayout",
        {
          staticClass: "tap-target",
          attrs: { columns: "auto, *", col: "0", orientation: "horizontal" },
          on: {
            tap: function($event) {
              _vm.toggleDoneItem()
            }
          }
        },
        [
          _c("Image", {
            staticClass: "check-box",
            attrs: { col: "0", src: _vm.imageSource(_vm.item) }
          }),
          _c("Label", {
            class: { "line-through": _vm.item.done && !_vm.item.deleted },
            attrs: { col: "1", text: _vm.item.name }
          })
        ],
        1
      ),
      _c(
        "GridLayout",
        {
          staticClass: "delete-container",
          attrs: { col: "1" },
          on: {
            tap: function($event) {
              _vm.deleteItem()
            }
          }
        },
        [
          _c(
            "StackLayout",
            [_c("Image", { attrs: { src: "res://delete" } })],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryList.vue?vue&type=template&id=47a3c888&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ListView",
    {
      class: { visible: _vm.listLoaded },
      attrs: { items: _vm.items, row: _vm.row },
      on: {
        "item-loading": function($event) {
          _vm.makeBackgroundTransparent(_vm.event)
        }
      }
    },
    [
      _c("v-template", {
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function(ref) {
              var item = ref.item
              var $index = ref.$index
              var $even = ref.$even
              var $odd = ref.$odd
              return _c("GroceryItem", { attrs: { item: item } })
            }
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Login/Login.vue?vue&type=template&id=dc03ccd0&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    {
      ref: "page",
      class: _vm.pageClasses,
      attrs: { actionBarHidden: "true", backgroundSpanUnderStatusBar: "true" }
    },
    [
      _c(
        "GridLayout",
        { staticClass: "login" },
        [
          _c("GridLayout", {
            ref: "background",
            staticClass: "background",
            attrs: { scaleX: "1.4", scaleY: "1.4" },
            on: {
              loaded: function($event) {
                _vm.startBackgroundAnimation()
              }
            }
          }),
          _c("LoginInitial", {
            ref: "loginInitial",
            attrs: { visible: _vm.state === "initial" },
            on: {
              login: function($event) {
                _vm.showMainContent()
              }
            }
          }),
          _c("LoginMain", {
            ref: "loginMain",
            attrs: { visible: _vm.state === "main" }
          }),
          _c(
            "AbsoluteLayout",
            {
              ref: "logoContainer",
              staticClass: "logo-container",
              attrs: { marginTop: "-260" }
            },
            [
              _c("Image", {
                attrs: {
                  translateY: "0",
                  src: "res://logo_login",
                  stretch: "none"
                }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginInitial.vue?vue&type=template&id=122328bc&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    {
      ref: "initialContainer",
      staticClass: "initial-container",
      attrs: { visibility: _vm.visible ? "visible" : "collapse" }
    },
    [
      _c("Label", {
        staticClass: "initial-label",
        attrs: { text: "GROCERIES" }
      }),
      _c(
        "StackLayout",
        {
          staticClass: "initial-button",
          on: {
            tap: function($event) {
              _vm.login()
            }
          }
        },
        [
          _c("Label", {
            staticClass: "initial-button-label",
            attrs: { text: "Login" }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginMain.vue?vue&type=template&id=15b7021e&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "StackLayout",
    {
      ref: "mainContainer",
      staticClass: "main-container",
      attrs: { visibility: _vm.visible ? "visible" : "collapse" }
    },
    [
      _c("Label", {
        staticClass: "main-label",
        attrs: { text: "GROCERIES", color: _vm.isLoggingIn ? "black" : "white" }
      }),
      _c(
        "GridLayout",
        {
          ref: "formControls",
          staticClass: "form-controls",
          attrs: { rows: "auto, auto", translateY: "50" }
        },
        [
          _c("TextField", {
            class: { light: !_vm.isLoggingIn },
            attrs: {
              hint: "Email Address",
              keyboardType: "email",
              returnKeyType: "next",
              iEnabled: !_vm.isAuthenticating,
              autocorrect: "false",
              autocapitalizationType: "none",
              row: "0",
              text: _vm.user.email
            },
            on: {
              returnPress: function($event) {
                _vm.focusPassword()
              },
              textChange: function($event) {
                _vm.$set(_vm.user, "email", $event.value)
              }
            }
          }),
          _c("TextField", {
            ref: "password",
            class: { light: !_vm.isLoggingIn },
            attrs: {
              hint: "Password",
              secure: "true",
              returnKeyType: "done",
              isEnabled: !_vm.isAuthenticating,
              row: "1",
              text: _vm.user.password
            },
            on: {
              returnPress: function($event) {
                _vm.submit()
              },
              textChange: function($event) {
                _vm.$set(_vm.user, "password", $event.value)
              }
            }
          }),
          _c("ActivityIndicator", {
            attrs: { busy: _vm.isAuthenticating, rowSpan: "2" }
          })
        ],
        1
      ),
      _c("Button", {
        staticClass: "submit-button",
        attrs: {
          text: _vm.isLoggingIn ? "Login" : "Sign up",
          isEnabled: !_vm.isAuthenticating
        },
        on: {
          tap: function($event) {
            _vm.submit()
          }
        }
      }),
      _c("Label", {
        staticClass: "forgot-password-label",
        attrs: { text: "Forgot password?", opacity: _vm.isLoggingIn ? 1 : 0 },
        on: {
          tap: function($event) {
            _vm.forgotPassword()
          }
        }
      }),
      _c(
        "StackLayout",
        {
          ref: "signUpStack",
          staticClass: "sign-up-stack",
          attrs: { translateY: "50" },
          on: {
            tap: function($event) {
              _vm.toggleDisplay()
            }
          }
        },
        [
          _c("Label", {
            attrs: { text: _vm.isLoggingIn ? "Sign up here" : "Back to login" }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$";

/***/ }),

/***/ "./components/Groceries/Groceries.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Groceries/Groceries.vue?vue&type=template&id=351a791c&");
/* harmony import */ var _Groceries_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Groceries/Groceries.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Groceries_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Groceries/Groceries.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Groceries_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('351a791c', component.options)
    } else {
      api.reload('351a791c', component.options)
    }
    module.hot.accept("./components/Groceries/Groceries.vue?vue&type=template&id=351a791c&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Groceries/Groceries.vue?vue&type=template&id=351a791c&");
(function () {
      api.rerender('351a791c', {
        render: _Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "components/Groceries/Groceries.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Groceries/Groceries.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/Groceries.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Groceries/Groceries.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/Groceries.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/Groceries/Groceries.vue?vue&type=template&id=351a791c&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Groceries/Groceries.vue?vue&type=template&id=351a791c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groceries_vue_vue_type_template_id_351a791c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Groceries/GroceryItem.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Groceries/GroceryItem.vue?vue&type=template&id=5baeb89e&");
/* harmony import */ var _GroceryItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Groceries/GroceryItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _GroceryItem_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Groceries/GroceryItem.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GroceryItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('5baeb89e', component.options)
    } else {
      api.reload('5baeb89e', component.options)
    }
    module.hot.accept("./components/Groceries/GroceryItem.vue?vue&type=template&id=5baeb89e&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Groceries/GroceryItem.vue?vue&type=template&id=5baeb89e&");
(function () {
      api.rerender('5baeb89e', {
        render: _GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "components/Groceries/GroceryItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Groceries/GroceryItem.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Groceries/GroceryItem.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryItem.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/Groceries/GroceryItem.vue?vue&type=template&id=5baeb89e&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryItem.vue?vue&type=template&id=5baeb89e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryItem_vue_vue_type_template_id_5baeb89e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Groceries/GroceryList.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Groceries/GroceryList.vue?vue&type=template&id=47a3c888&");
/* harmony import */ var _GroceryList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Groceries/GroceryList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _GroceryList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Groceries/GroceryList.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GroceryList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('47a3c888', component.options)
    } else {
      api.reload('47a3c888', component.options)
    }
    module.hot.accept("./components/Groceries/GroceryList.vue?vue&type=template&id=47a3c888&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Groceries/GroceryList.vue?vue&type=template&id=47a3c888&");
(function () {
      api.rerender('47a3c888', {
        render: _GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "components/Groceries/GroceryList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Groceries/GroceryList.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Groceries/GroceryList.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryList.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/Groceries/GroceryList.vue?vue&type=template&id=47a3c888&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Groceries/GroceryList.vue?vue&type=template&id=47a3c888&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroceryList_vue_vue_type_template_id_47a3c888___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Login/Login.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login/Login.vue?vue&type=template&id=dc03ccd0&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Login/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Login/Login.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('dc03ccd0', component.options)
    } else {
      api.reload('dc03ccd0', component.options)
    }
    module.hot.accept("./components/Login/Login.vue?vue&type=template&id=dc03ccd0&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login/Login.vue?vue&type=template&id=dc03ccd0&");
(function () {
      api.rerender('dc03ccd0', {
        render: _Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "components/Login/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Login/Login.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Login/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Login/Login.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Login/Login.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/Login/Login.vue?vue&type=template&id=dc03ccd0&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Login/Login.vue?vue&type=template&id=dc03ccd0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_dc03ccd0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Login/LoginInitial.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login/LoginInitial.vue?vue&type=template&id=122328bc&");
/* harmony import */ var _LoginInitial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Login/LoginInitial.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _LoginInitial_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Login/LoginInitial.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LoginInitial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('122328bc', component.options)
    } else {
      api.reload('122328bc', component.options)
    }
    module.hot.accept("./components/Login/LoginInitial.vue?vue&type=template&id=122328bc&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login/LoginInitial.vue?vue&type=template&id=122328bc&");
(function () {
      api.rerender('122328bc', {
        render: _LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "components/Login/LoginInitial.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Login/LoginInitial.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginInitial.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Login/LoginInitial.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginInitial.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/Login/LoginInitial.vue?vue&type=template&id=122328bc&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginInitial.vue?vue&type=template&id=122328bc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginInitial_vue_vue_type_template_id_122328bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Login/LoginMain.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login/LoginMain.vue?vue&type=template&id=15b7021e&");
/* harmony import */ var _LoginMain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Login/LoginMain.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _LoginMain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Login/LoginMain.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LoginMain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('15b7021e', component.options)
    } else {
      api.reload('15b7021e', component.options)
    }
    module.hot.accept("./components/Login/LoginMain.vue?vue&type=template&id=15b7021e&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login/LoginMain.vue?vue&type=template&id=15b7021e&");
(function () {
      api.rerender('15b7021e', {
        render: _LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "components/Login/LoginMain.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Login/LoginMain.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginMain.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Login/LoginMain.vue?vue&type=style&index=0&lang=scss&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/css-hot-loader/index.js!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginMain.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_css_hot_loader_index_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_2_3_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/Login/LoginMain.vue?vue&type=template&id=15b7021e&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Login/LoginMain.vue?vue&type=template&id=15b7021e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginMain_vue_vue_type_template_id_15b7021e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./main.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_BackendService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./services/BackendService.js");
/* harmony import */ var _components_Login_Login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Login/Login.vue");
/* harmony import */ var _components_Groceries_Groceries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./components/Groceries/Groceries.vue");
/* harmony import */ var nativescript_vue_devtools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/nativescript-vue-devtools/index.js");
/* harmony import */ var nativescript_vue_devtools__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue_devtools__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./store/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_6__);

            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
            if (true) {
                const fileSystemModule = __webpack_require__("../node_modules/tns-core-modules/file-system/file-system.js");
                const applicationFiles = fileSystemModule.knownFolders.currentApp();

                global.__hmrLivesyncBackup = global.__onLiveSync;
                global.__onLiveSync = function () {
                    console.log("HMR: Sync...");
                    __webpack_require__("../node_modules/nativescript-dev-webpack/hot.js")(__webpack_require__.h(), (fileName) => applicationFiles.getFile(fileName));
                };

                global.__hmrRefresh = function(type) {
                    global.__hmrNeedReload = true;
                    setTimeout(() => {
                        if(global.__hmrNeedReload) {
                            global.__hmrNeedReload = false;
                            global.__hmrLivesyncBackup();
                        }
                    });
                }

                global.__hmrInitialSync = true; // needed to determine if we are performing initial sync
                global.__onLiveSync();
            }
        
            const context = __webpack_require__("./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$");
            global.registerWebpackModules(context);
            
        __webpack_require__("../node_modules/tns-core-modules/bundle-entry-points.js");
        






const backendService = new _services_BackendService__WEBPACK_IMPORTED_MODULE_1__["default"]();

if (true) {
  nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(nativescript_vue_devtools__WEBPACK_IMPORTED_MODULE_4___default.a);
} // Prints Vue logs when --env.production is *NOT* set while building


nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.silent = "development" === 'production';
new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  render: h => {
    console.log("BackendService:", backendService.isLoggedIn());
    return h('frame', [h(backendService.isLoggedIn() ? _components_Groceries_Groceries__WEBPACK_IMPORTED_MODULE_3__["default"] : _components_Login_Login__WEBPACK_IMPORTED_MODULE_2__["default"])]);
  },
  store: _store__WEBPACK_IMPORTED_MODULE_5__["default"]
}).$start();
    
        
        
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./models/User.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var email_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/email-validator/index.js");
/* harmony import */ var email_validator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(email_validator__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (class {
  constructor() {
    this.email = '';
    this.password = '';
  }

  isValidEmail() {
    return email_validator__WEBPACK_IMPORTED_MODULE_0___default.a.validate(this.email);
  }

});

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"android":{"v8Flags":"--expose_gc"},"main":"main","name":"groceries-ns-vue","version":"1.2.0"};

/***/ }),

/***/ "./services/BackendService.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BackendService; });
/* harmony import */ var tns_core_modules_application_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/application-settings/application-settings.js");
/* harmony import */ var tns_core_modules_application_settings__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_application_settings__WEBPACK_IMPORTED_MODULE_0__);

const tokenKey = "token";
/**
 * Parent service class. Has common configs and methods.
 */

class BackendService {
  constructor() {
    this.baseUrl = "https://baas.kinvey.com/";
    this.appKey = "kid_HyHoT_REf";
    this.appUserHeader = "Basic a2lkX0h5SG9UX1JFZjo1MTkxMDJlZWFhMzQ0MzMyODFjN2MyODM3MGQ5OTIzMQ";
    this.apiUrl = "";
  }

  isLoggedIn() {
    console.log('GETTING TOKEN LOGGED IN: ' + Object(tns_core_modules_application_settings__WEBPACK_IMPORTED_MODULE_0__["getString"])(tokenKey));
    return !!Object(tns_core_modules_application_settings__WEBPACK_IMPORTED_MODULE_0__["getString"])(tokenKey);
  }

  get token() {
    console.log('GETTING TOKEN: ' + Object(tns_core_modules_application_settings__WEBPACK_IMPORTED_MODULE_0__["getString"])(tokenKey));
    return Object(tns_core_modules_application_settings__WEBPACK_IMPORTED_MODULE_0__["getString"])(tokenKey);
  }

  set token(newToken) {
    Object(tns_core_modules_application_settings__WEBPACK_IMPORTED_MODULE_0__["setString"])(tokenKey, newToken);
    console.log('TOKEN SET TO: ' + newToken);
  }

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response);
      }

      console.log('Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString());
      reject('Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString());
    });
  }

  getJson(response) {
    return new Promise((resolve, reject) => {
      console.info('Content: ' + response.content.toString());
      resolve(response.content.toJSON());
    }).catch(e => {
      console.error('Error parsing JSON response: ' + e);
      throw 'Error parsing JSON response: ' + e;
    });
  }

}

/***/ }),

/***/ "./services/GroceryService.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GroceryService; });
/* harmony import */ var tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/http/http.js");
/* harmony import */ var tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BackendService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./services/BackendService.js");


class GroceryService extends _BackendService__WEBPACK_IMPORTED_MODULE_1__["default"] {
  load() {
    return tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__["request"]({
      url: this.baseUrl + "appdata/" + this.appKey + "/Groceries?sort=" + encodeURIComponent("{\"_kmd.lmt\": -1}"),
      method: 'GET',
      headers: this.getHeaders()
    }).then(this.validateCode).then(this.getJson).then(data => {
      console.info(data);
      console.info(`Received ${data.length} items from the backend.`);
      return data.map(item => {
        return {
          id: item._id,
          name: item.Name,
          done: item.Done || false,
          deleted: item.Deleted || false
        };
      });
    });
  }

  add(itemName) {
    return tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__["request"]({
      url: this.baseUrl + "appdata/" + this.appKey + "/Groceries",
      method: 'POST',
      headers: this.getHeaders(),
      content: JSON.stringify({
        Name: itemName
      })
    }).then(this.validateCode).then(this.getJson).then(data => {
      console.info(`Added item with id ${data._id}.`);
      return {
        id: data._id,
        name: itemName,
        done: false,
        deleted: false
      };
    });
  }

  update(item) {
    console.log('putting', item, JSON.stringify({
      Name: item.name,
      Done: item.done,
      Deleted: item.deleted
    }));
    return tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__["request"]({
      url: this.baseUrl + "appdata/" + this.appKey + "/Groceries/" + item.id,
      method: 'PUT',
      headers: this.getHeaders(),
      content: JSON.stringify({
        Name: item.name,
        Done: item.done,
        Deleted: item.deleted
      })
    }).then(this.validateCode).then(this.getJson).then(data => {
      console.info(data);
      console.info(`Updated item with id ${item.id}.`);
      return item;
    });
  }

  delete(item) {
    console.log('deleting ', item);
    return tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__["request"]({
      url: this.baseUrl + "appdata/" + this.appKey + "/Groceries/" + item.id,
      method: 'DELETE',
      headers: this.getHeaders()
    }).then(this.validateCode).then(this.getJson).then(data => {
      console.info(data);
      console.info(`Updated item with id ${item.id}.`);
      return item;
    });
  }

  getHeaders(toAppend = {}) {
    return Object.assign({
      'Content-Type': 'application/json',
      'Authorization': 'Kinvey ' + this.token
    }, toAppend);
  }

}

/***/ }),

/***/ "./services/LoginService.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginService; });
/* harmony import */ var tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/http/http.js");
/* harmony import */ var tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BackendService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./services/BackendService.js");


class LoginService extends _BackendService__WEBPACK_IMPORTED_MODULE_1__["default"] {
  login(user) {
    return tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__["request"]({
      url: this.baseUrl + "user/" + this.appKey + "/login",
      method: "POST",
      headers: this.getCommonHeaders(),
      content: JSON.stringify({
        username: user.email,
        password: user.password
      })
    }).then(this.validateCode).then(this.getJson).then(data => {
      console.info('User logged in with token: ' + data._kmd.authtoken);
      this.token = data._kmd.authtoken;
    });
  }

  register(user) {
    return tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__["request"]({
      url: this.baseUrl + "user/" + this.appKey,
      method: "POST",
      headers: this.getCommonHeaders(),
      content: JSON.stringify({
        username: user.email,
        email: user.email,
        password: user.password
      })
    }).then(this.validateCode).then(this.getJson).then(data => {
      console.info('User registered: ', data);
    });
  }

  resetPassword(email) {
    return tns_core_modules_http__WEBPACK_IMPORTED_MODULE_0__["request"]({
      url: this.baseUrl + "rpc/" + this.appKey + "/" + email + "/user-password-reset-initiate",
      method: "POST",
      headers: this.getCommonHeaders()
    }).then(this.validateCode).then(this.getJson).then(data => {
      console.info('Reset password for email: ' + data.Result.Result);
    });
  }

  logout() {
    this.token = "";
  }

  getCommonHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": this.appUserHeader
    };
  }

}

/***/ }),

/***/ "./store/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadItems", function() { return loadItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addItem", function() { return addItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateItem", function() { return updateItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleDoneItem", function() { return toggleDoneItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleDeleteItem", function() { return toggleDeleteItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteItem", function() { return deleteItem; });
/* harmony import */ var _mutation_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./store/mutation-types.js");
/* harmony import */ var _services_GroceryService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./services/GroceryService.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const groceryService = new _services_GroceryService__WEBPACK_IMPORTED_MODULE_1__["default"]();
const loadItems = ({
  commit
}) => {
  const task = 'action loadItems';
  console.log(task);
  return new Promise((resolve, reject) => {
    commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["ADD_PROCESSING_TASK"], task);
    groceryService.load().then(items => {
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["SET_ITEMS"], items);
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"], task);
      resolve();
    }).catch(error => {
      console.error(`Error loading items from the backend: ${error}.`);
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"], task);
      reject(error);
    });
  });
};
const addItem = ({
  commit
}, itemName) => {
  const task = 'action addItem';
  console.log(task);
  return new Promise((resolve, reject) => {
    commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["ADD_PROCESSING_TASK"], task);
    groceryService.add(itemName).then(item => {
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["ADD_ITEM"], item);
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"], task);
      resolve();
    }).catch(error => {
      console.error(`Error adding item to the backend: ${error}.`);
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"], task);
      reject(error);
    });
  });
};
const updateItem = ({
  commit
}, item) => {
  const task = 'action updateItem';
  console.log(task);
  return new Promise((resolve, reject) => {
    commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["ADD_PROCESSING_TASK"], task);
    groceryService.update(item).then(item => {
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["UPDATE_ITEM"], item);
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"], task);
      resolve(item);
    }).catch(error => {
      console.error(`Error setting updating Item in the backend: ${error}.`);
      commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"], task);
      reject(error);
    });
  });
};
const toggleDoneItem = ({
  commit
}, item) => {
  console.log('action toggleDoneItem');
  return updateItem({
    commit
  }, _objectSpread({}, item, {
    done: !item.done
  }));
};
const toggleDeleteItem = ({
  commit
}, item) => {
  console.log('action toggleDoneItem');
  return updateItem({
    commit
  }, _objectSpread({}, item, {
    deleted: !item.deleted
  }));
};
const deleteItem = ({
  commit
}, item) => {
  const task = 'action deleteItem';
  console.log(task);

  if (item.deleted) {
    // if soft deleted, delete permanently from backend
    commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["ADD_PROCESSING_TASK"], task);
    return new Promise((resolve, reject) => {
      groceryService.delete(item).then(item => {
        commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["DELETE_ITEM"], item);
        commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"], task);
        resolve(item);
      }).catch(error => {
        console.error(`Error deleting Itempermanently in the backend: ${error}.`);
        commit(_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"], task);
        reject(error);
      });
    });
  } else {
    // 'soft' delete
    return updateItem({
      commit
    }, _objectSpread({}, item, {
      deleted: true
    }));
  }
};

/***/ }),

/***/ "./store/getters.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "itemList", function() { return itemList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deletedItemList", function() { return deletedItemList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProcessing", function() { return isProcessing; });
const itemList = state => {
  return state.items.filter(item => !item.deleted);
};
const deletedItemList = state => {
  return state.items.filter(item => item.deleted);
};
const isProcessing = state => {
  // while there is at least one task processing, return true
  return state.processingTasks.length >= 1;
};

/***/ }),

/***/ "./store/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _mutations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./store/mutations.js");
/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./store/actions.js");
/* harmony import */ var _getters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./store/getters.js");





nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
const debug = "development" !== 'production';
const store = new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  state: {
    // array of grocery items
    items: [],
    // array of ongoing tasks. We keep track of the tasks to show/hide the
    // activity indicator in the groceries page.
    processingTasks: []
  },
  mutations: _mutations_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  actions: _actions_js__WEBPACK_IMPORTED_MODULE_3__,
  getters: _getters__WEBPACK_IMPORTED_MODULE_4__,
  strict: debug
});
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$store = store;
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./store/mutation-types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ITEMS", function() { return SET_ITEMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ITEM", function() { return ADD_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_ITEM", function() { return UPDATE_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_ITEM", function() { return DELETE_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_PROCESSING_TASK", function() { return ADD_PROCESSING_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_PROCESSING_TASK", function() { return REMOVE_PROCESSING_TASK; });
// items mutations
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM'; // tasks mutations

const ADD_PROCESSING_TASK = 'ADD_PROCESSING_TASK';
const REMOVE_PROCESSING_TASK = 'REMOVE_PROCESSING_TASK';

/***/ }),

/***/ "./store/mutations.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mutation_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./store/mutation-types.js");

const mutations = {
  [_mutation_types__WEBPACK_IMPORTED_MODULE_0__["SET_ITEMS"]](state, items) {
    console.log('SET_ITEMS', items);
    state.items = items;
  },

  [_mutation_types__WEBPACK_IMPORTED_MODULE_0__["ADD_ITEM"]](state, item) {
    console.log('ADD_ITEM', item);
    state.items.push(item);
  },

  [_mutation_types__WEBPACK_IMPORTED_MODULE_0__["UPDATE_ITEM"]](state, item) {
    console.log('UPDATE_ITEM', item);
    let itemToUpdate = state.items.find(i => i.id == item.id);
    Object.assign(itemToUpdate, item);
  },

  [_mutation_types__WEBPACK_IMPORTED_MODULE_0__["DELETE_ITEM"]](state, item) {
    console.log('DELETE_ITEM', item);
    state.items.splice(state.items.findIndex(i => i.id == item.id), 1);
  },

  [_mutation_types__WEBPACK_IMPORTED_MODULE_0__["ADD_PROCESSING_TASK"]](state, task) {
    console.log('ADD_PROCESSING_TASK', task);
    state.processingTasks.push(task);
  },

  [_mutation_types__WEBPACK_IMPORTED_MODULE_0__["REMOVE_PROCESSING_TASK"]](state, task) {
    console.log('REMOVE_PROCESSING_TASK', task);
    state.processingTasks.splice(state.processingTasks.indexOf(task), 1);
  }

};
/* harmony default export */ __webpack_exports__["default"] = (mutations);

/***/ }),

/***/ "./styles.scss":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// extracted by mini-css-extract-plugin
    if(true) {
      // 1538829537213
      var cssReload = __webpack_require__("../node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  ;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.__hmrRefresh('style');
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./utils/alert.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return alert; });
/* harmony import */ var ui_dialogs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/ui/dialogs/dialogs.js");
/* harmony import */ var ui_dialogs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ui_dialogs__WEBPACK_IMPORTED_MODULE_0__);

function alert(message) {
  return ui_dialogs__WEBPACK_IMPORTED_MODULE_0__["alert"]({
    title: "Groceries",
    okButtonText: "OK",
    message: message
  });
}

/***/ })

/******/ });